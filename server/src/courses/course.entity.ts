// server/src/courses/course.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  // URL de la vidéo associée au cours
  @Column()
  videoUrl: string;

  // Progression de la vidéo pour ce cours (0-100)
  @Column({ type: 'int', default: 0 })
  progress: number;

  // Identifiant de l'utilisateur auquel ce cours appartient (optionnel)
  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
