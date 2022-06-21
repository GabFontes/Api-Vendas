import AppError from '@shared/errors/AppError';
import { compareSync } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    // Verifica se existe um usuário com o email fornecido
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = compareSync(password, user.password);

    // Verifica se a senha fornecida é igual a senha armazenada no banco
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    return user;
  }
}
