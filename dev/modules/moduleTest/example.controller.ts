import { Controller, MiddlewareRoute, Post, ok, HttpRequest } from '../../lib';
import { ExampleService } from './example.service';
import { exampleValidator } from './example.validator';

@Controller('/example')
export class ExampleController {
  constructor(private readonly service: ExampleService) {}

  @Post('/find')
  @MiddlewareRoute(exampleValidator.adapterToHttpMiddleware('body'))
  async find(httpRequest: HttpRequest) {
    const { id, error } = httpRequest.body;

    const data = this.service.find(id, error);

    return ok(data);
  }
}
