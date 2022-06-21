import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    // Verfica se o produto existe antes de exibi-lo.
    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}
