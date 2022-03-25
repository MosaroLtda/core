import { ExampleRepository } from '../../repositories/ExampleRepository';
import { BadRequestError } from '../../lib';

export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  find(id: number, error?: boolean) {
    if (error) {
      throw new BadRequestError('Example Error');
    }

    return this.exampleRepository.find(id);
  }
}
