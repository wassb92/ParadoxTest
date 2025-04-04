// server/src/courses/courses.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = this.coursesRepository.create(courseData);
    return this.coursesRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Cours non trouvé');
    }
    return course;
  }

  async findByUser(userId: number): Promise<Course[]> {
    return this.coursesRepository.find({ where: { userId } });
  }

  async update(id: number, courseData: Partial<Course>): Promise<Course> {
    await this.coursesRepository.update(id, courseData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}
