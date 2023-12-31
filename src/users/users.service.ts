import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  create(email: string, password: string) {
    const newUser = this.repo.create({ email, password });
    return this.repo.save(newUser);
  }

  findOne(id: number) {
    if (id) {
      return this.repo.findOne({ id });
    }

    return null;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const userToUpdate = await this.findOne(id);

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    Object.assign(userToUpdate, attrs);

    return this.repo.save(userToUpdate);
  }

  async remove(id: number) {
    const userToDelete = await this.findOne(id);

    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(userToDelete);
  }
}
