import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    if (!userData.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      enrolledCourses: [],
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user ?? undefined;
  }

  async updateProgress(userId: number, progress: number): Promise<void> {
    await this.usersRepository.update(userId, { progress });
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(userId, updateData);
    const user = await this.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
