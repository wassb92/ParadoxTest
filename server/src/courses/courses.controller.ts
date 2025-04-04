// server/src/courses/courses.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UsersService } from '../users/users.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    const course = await this.coursesService.findOne(Number(id));
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }
    return course;
  }

  @Post()
  async create(@Body() courseData: Partial<Course>): Promise<Course> {
    const newCourse = await this.coursesService.create(courseData);
    if (newCourse.userId) {
      const user = await this.usersService.findById(newCourse.userId);
      if (user) {
        // Ajouter l'ID du cours dans enrolledCourses s'il n'est pas déjà présent
        const enrolledCourses = user.enrolledCourses || [];
        if (!enrolledCourses.includes(newCourse.id)) {
          enrolledCourses.push(newCourse.id);
        }
        // Récupérer tous les cours de l'utilisateur et calculer la progression moyenne
        const userCourses = await this.coursesService.findByUser(
          newCourse.userId,
        );
        const avgProgress =
          userCourses.reduce((acc, cur) => acc + cur.progress, 0) /
          userCourses.length;
        const avgProgressInt = Math.round(avgProgress); // Arrondi en entier
        await this.usersService.updateUser(newCourse.userId, {
          enrolledCourses,
          progress: avgProgressInt,
        });
      }
    }
    return newCourse;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const updatedCourse = await this.coursesService.update(id, updateCourseDto);
    if (updatedCourse.userId) {
      const user = await this.usersService.findById(updatedCourse.userId);
      if (user) {
        const enrolledCourses = user.enrolledCourses || [];
        if (!enrolledCourses.includes(updatedCourse.id)) {
          enrolledCourses.push(updatedCourse.id);
        }
        const userCourses = await this.coursesService.findByUser(
          updatedCourse.userId,
        );
        const avgProgress =
          userCourses.reduce((acc, cur) => acc + cur.progress, 0) /
          userCourses.length;
        const avgProgressInt = Math.round(avgProgress);
        await this.usersService.updateUser(updatedCourse.userId, {
          enrolledCourses,
          progress: avgProgressInt,
        });
      }
    }
    return updatedCourse;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    // Récupérer le cours à supprimer
    const course = await this.coursesService.findOne(Number(id));
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }
    if (course.userId) {
      const user = await this.usersService.findById(course.userId);
      if (user) {
        // Retirer l'ID du cours du tableau enrolledCourses
        const updatedEnrolledCourses = (user.enrolledCourses || []).filter(
          (courseId) => courseId !== course.id,
        );
        // Recalculer la progression moyenne
        const userCourses = await this.coursesService.findByUser(course.userId);
        const avgProgress =
          userCourses.length > 0
            ? userCourses.reduce((acc, cur) => acc + cur.progress, 0) /
              userCourses.length
            : 0;
        const avgProgressInt = Math.round(avgProgress);
        await this.usersService.updateUser(course.userId, {
          enrolledCourses: updatedEnrolledCourses,
          progress: avgProgressInt,
        });
      }
    }
    await this.coursesService.remove(course.id);
    return { message: 'Cours supprimé avec succès' };
  }
}
