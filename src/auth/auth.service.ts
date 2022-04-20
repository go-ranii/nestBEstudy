import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!user) return new ApolloError('일치하는 유저 정보가 없습니다.');
    if (user.password !== password)
      return new ApolloError('비밀번호를 확인하세요.');

    const accessToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      {
        secret: 'qwer',
        algorithm: 'HS256',
        subject: 'accessToken',
        expiresIn: '2h',
      },
    );
    return accessToken;
  }
}
