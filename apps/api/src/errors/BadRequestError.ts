/** Bad Request Error */
export class BadRequestError extends Error {
  constructor() {
    super('Bad Request');
    this.name = 'BadRequestError';
  }
}
