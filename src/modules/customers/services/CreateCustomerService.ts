import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    // Verifica se existe um usuário com o mesmo email antes de criá-lo
    if (emailExists) {
      throw new AppError('Email addres already used');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}
