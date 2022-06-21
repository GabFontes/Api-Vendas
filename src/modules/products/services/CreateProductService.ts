import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    // Verfica se já existe um produto com o nome informado antes de criá-lo.
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // Prepara o objeto do novo produto.
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    // Salva o novo produto.
    await productsRepository.save(product);
    return product;
  }
}
