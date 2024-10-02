import { ExceptionHandler } from "./ExceptionHandler.ts";

export class RunTimeExceptionHandler implements ExceptionHandler {
  report(error: Error): void {
    console.error("Reporting error:", error);
  }

  render(error: Error): Response {
    return new Response("An error occurred", { status: 500 });
  }
}