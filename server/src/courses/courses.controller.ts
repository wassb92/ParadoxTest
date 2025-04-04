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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UsersService } from '../users/users.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private usersService: UsersService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste de tous les cours' })
  @ApiResponse({ status: 200, description: 'Liste des cours', type: [Course] })
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un cours par son identifiant' })
  @ApiResponse({ status: 200, description: 'Cours trouvé', type: Course })
  @ApiResponse({ status: 404, description: 'Cours non trouvé' })
  async findOne(@Param('id') id: number): Promise<Course> {
    const course = await this.coursesService.findOne(Number(id));
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }
    return course;
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau cours' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Cours créé', type: Course })
  async create(@Body() courseData: Partial<Course>): Promise<Course> {
    const newCourse = await this.coursesService.create(courseData);
    if (newCourse.userId) {
      const user = await this.usersService.findById(newCourse.userId);
      if (user) {
        const enrolledCourses = user.enrolledCourses || [];
        if (!enrolledCourses.includes(newCourse.id)) {
          enrolledCourses.push(newCourse.id);
        }

        const userCourses = await this.coursesService.findByUser(
          newCourse.userId,
        );
        const avgProgress =
          userCourses.reduce((acc, cur) => acc + cur.progress, 0) /
          userCourses.length;
        const avgProgressInt = Math.round(avgProgress);
        await this.usersService.updateUser(newCourse.userId, {
          enrolledCourses,
          progress: avgProgressInt,
        });
      }
    }
    return newCourse;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un cours existant' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Cours mis à jour', type: Course })
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
  @ApiOperation({ summary: 'Supprimer un cours' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Cours supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Cours non trouvé' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const course = await this.coursesService.findOne(Number(id));
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }
    if (course.userId) {
      const user = await this.usersService.findById(course.userId);
      if (user) {
        const updatedEnrolledCourses = (user.enrolledCourses || []).filter(
          (courseId) => courseId !== course.id,
        );

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
