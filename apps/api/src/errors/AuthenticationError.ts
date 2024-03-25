/** Authentication Error */
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export { AuthenticationError };