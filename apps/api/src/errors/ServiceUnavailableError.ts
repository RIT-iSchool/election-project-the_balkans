/** Service Unavailable Error */
export class ServiceUnavailableError extends Error {
  constructor() {
    super('Service Unavailable');
    this.name = 'ServiceUnavailableError';
  }
}
