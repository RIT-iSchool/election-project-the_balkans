/** Unprocessable Entity Error */
export class UnprocessableEntityError extends Error {
  constructor() {
    super('Unprocessable Entity');
    this.name = 'UnprocessableEntityError';
  }
}
