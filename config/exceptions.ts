/**
 * Exceptions Configuration
 * 
 * Allows defining custom exception handling logic.
 */
export class Exceptions {
  private handlers: Map<string, (error: Error) => Response> = new Map();

  /**
   * Register an exception handler.
   * 
   * @param exception - The exception class name or type.
   * @param handler - The handler function for the exception.
   */
  public registerHandler(
    exception: string,
    handler: (error: Error) => Response
  ): void {
    this.handlers.set(exception, handler);
  }

  /**
   * Get the handler for a specific exception.
   * 
   * @param exception - The exception class name or type.
   * @returns The handler function or undefined.
   */
  public getHandler(exception: string): ((error: Error) => Response) | undefined {
    return this.handlers.get(exception);
  }
}
