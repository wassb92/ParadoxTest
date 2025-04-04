// server/src/courses/courses.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { UsersModule } from '../users/users.module'; // Import du module des utilisateurs

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    UsersModule, // Ajoute cet import pour rendre UsersService disponible
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
