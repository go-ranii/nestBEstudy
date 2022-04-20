import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async fetchUsers(page?: number, perPage?: number) {
    page = page ? page : 1;
    perPage = perPage ? perPage : 10;
    const startIndex = (page - 1) * perPage;

    const result = await this.userRepository
      .createQueryBuilder('user')
      .limit(perPage)
      .offset(startIndex)
      .getMany();
    return result;
  }
  async createUser(createUserInput: CreateUserInput) {
    const user = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (user) return new ApolloError('이미 등록된 회원입니다.');
    const newUser = await this.userRepository.save({ ...createUserInput });
    return newUser;
  }

  async fetchAllUser() {
    return await this.userRepository.find();
  }

  async fetchUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) return new ApolloError('일치하는 회원이 없습니다.');

    return user;
  }

  async updateUser(updateUserInput: UpdateUserInput, userId: string) {
    const result = await this.userRepository.update(
      { id: userId },
      { ...updateUserInput },
    );
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    return result.affected > 0 ? user : new ApolloError('회원정보 수정 실패');
  }

  async deleteUser(userId: string) {
    const result = await this.userRepository.softDelete({ id: userId });

    return result.affected > 0;
  }
}
