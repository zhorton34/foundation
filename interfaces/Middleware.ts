export interface Middleware {
  getMiddlewares(): ((request: Request, next: () => Promise<Response>) => Promise<Response>)[];
}