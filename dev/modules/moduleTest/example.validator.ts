import { Validator } from '../../lib';

export const exampleValidator = new Validator({
  id: {
    type: 'NUMBER',
    required: true,
  },
  error: {
    type: 'BOOLEAN',
  },
});
