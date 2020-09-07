import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.finByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email adress already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
