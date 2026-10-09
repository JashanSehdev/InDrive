import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto.js';
import bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser)
      throw new ConflictException({
        code: 'ALREADY_EXIST',
        message: 'user already exist',
      });

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const result = await this.userRepository.save(user);

    const payload = { id: result.id, email: result.email};

    const token = this.jwtService.sign(payload);

    return token;
  }

  async loginUser(loginUserDto: LoginUserDto, ip: string, userAgent: string) {
    const existingUser = await this.findOneByEmail(loginUserDto.email);

    if (!existingUser)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });

    const isAuthentic = await bcrypt.compare(
      loginUserDto.password,
      existingUser.password,
    );

    if (!isAuthentic)
      throw new UnauthorizedException({
        code: 'UNAUTHORIZE',
        message: 'user is not authorized',
      });


    const token = this.jwtService.sign({
      id: existingUser.id,
      email: existingUser.email,
    });
    return token;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
