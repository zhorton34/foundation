/**
 * Abstract class for handling exceptions.
 * 
 * This class defines the structure for custom exception handlers. 
 * Implementing classes must provide their own logic for reporting 
 * and rendering errors. This allows for flexible error handling 
 * strategies in the application.
 * 
 * @example
 * ```ts
 * class CustomExceptionHandler extends ExceptionHandler {
 *   report(error: Error): void {
 *     console.error("Reporting error:", error);
 *     // Additional reporting logic here
 *   }
 * 
 *   render(error: Error): Response {
 *     return new Response("An error occurred", { status: 500 });
 *   }
 * }
 * ```
 */
export interface ExceptionHandler {
  /**
   * Report the given error.
   * 
   * This method should contain the logic for logging or reporting 
   * the error to an external service or system. Implementing classes 
   * should define how the error is reported.
   * 
   * @param error - The error to be reported.
   * 
   * @example
   * ```ts
   * report(new Error("Something went wrong"));
   * ```
   */
  report(error: Error): void;

  /**
   * Render a response for the given error.
   * 
   * This method should return a Response object that represents 
   * the error to be sent back to the client. Implementing classes 
   * should define how the error is rendered, including the status 
   * code and any relevant error messages.
   * 
   * @param error - The error to be rendered.
   * @returns A Response object representing the error.
   * 
   * @example
   * ```ts
   * const response = render(new Error("Not Found"));
   * console.log(response); // Response { status: 404, ... }
   * ```
   */
  render(error: Error): Response;
}
