import { createModule } from '../../lib';
import exampleRepository from '../../repositories/ExampleRepository';

import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

const serviceInstance = new ExampleService(exampleRepository);
const controllerInstance = new ExampleController(serviceInstance);

export default createModule({
  controller: ExampleController,
  controllerInstance,
});
