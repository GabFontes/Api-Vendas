import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    // Verfica se existe um produto com o id informado antes de atualizá-lo.
    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);
    // Verfica se já existe um produto com o nome informado antes de atualizá-lo.
    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    // Atualiza as informações do produto.
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    // Salva as informações do produto atualizado.
    await productsRepository.save(product);

    return product;
  }
}
