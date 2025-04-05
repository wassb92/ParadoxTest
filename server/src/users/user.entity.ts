import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: "Identifiant unique de l'utilisateur" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Adresse email de l'utilisateur" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    writeOnly: true,
  })
  @Column()
  password: string;

  @ApiProperty({ description: "Prénom de l'utilisateur" })
  @Column()
  firstName: string;

  @ApiProperty({ description: "Nom de famille de l'utilisateur" })
  @Column()
  lastName: string;

  @ApiProperty({ description: "Rôle de l'utilisateur", default: 'student' })
  @Column({ default: 'student' })
  role: string; // "student" ou "admin"

  @ApiProperty({
    description: "Progression moyenne de l'utilisateur",
    default: 0,
  })
  @Column({ type: 'int', default: 0 })
  progress: number;

  @ApiProperty({
    description: "Liste des identifiants des cours suivis par l'utilisateur",
    type: [Number],
    nullable: true,
  })
  @Column('int', { array: true, nullable: true })
  enrolledCourses: number[];

  @ApiProperty({
    description: "Type d'abonnement de l'utilisateur",
    example: 'monthly',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  subscriptionType: string | null;

  @ApiProperty({
    description: "Identifiant de l'abonnement Stripe",
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  stripeSubscriptionId: string | null;

  @ApiProperty({ description: 'Date de création du compte' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date de la dernière mise à jour du compte' })
  @UpdateDateColumn()
  updatedAt: Date;
}
