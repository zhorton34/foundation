/**
 * Middleware Configuration
 * 
 * Allows adding, removing, and managing middleware in the application.
 */
export class Middleware {
  private middlewares: Array<(req: Request, next: () => Promise<Response>) => Promise<Response>> = [];

  /**
   * Add a middleware to the stack.
   * 
   * @param middleware - A middleware function.
   */
  public add(
    middleware: (
      req: Request,
      next: () => Promise<Response>
    ) => Promise<Response>
  ): void {
    this.middlewares.push(middleware);
  }

  /**
   * Get all registered middlewares.
   * 
   * @returns An array of middleware functions.
   */
  public getMiddlewares(): Array<
    (req: Request, next: () => Promise<Response>) => Promise<Response>
  > {
    return this.middlewares;
  }
}
