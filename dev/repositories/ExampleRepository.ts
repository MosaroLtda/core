export class ExampleRepository {
  find(id: number) {
    return {
      id,
      name: 'Example',
    };
  }
}

export default new ExampleRepository();
