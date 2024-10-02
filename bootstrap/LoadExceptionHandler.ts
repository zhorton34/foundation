import { Application } from "../application.ts";
import { ExceptionHandler } from "../exceptions/ExceptionHandler.ts";
import { RunTimeExceptionHandler } from "../exceptions/RunTimeExceptionHandler.ts";
import { Bootstrapper } from "./Bootstrapper.ts";

export class LoadExceptionHandler implements Bootstrapper {
  async bootstrap(app: Application) {
    const config = app.resolve<Record<string, any>>("config");
    const handlerClass = config.app?.exceptionHandler || RunTimeExceptionHandler;

    if (typeof handlerClass !== "function") {
      throw new Error("Invalid exception handler specified in config");
    }

    const handler = new handlerClass();
    if (!(handler as ExceptionHandler)) {
      throw new Error("Exception handler must extend ExceptionHandler class");
    }

    app.singleton("exceptionHandler", () => handler);
  }
}