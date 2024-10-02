import { Application } from "../mod.ts";
import { LoadExceptionHandler } from "./LoadExceptionHandler.ts";
import { assertEquals, assertRejects } from "jsr:@std/assert";
import { ExceptionHandler } from "../exceptions/ExceptionHandler.ts";
import { RunTimeExceptionHandler } from "../exceptions/RunTimeExceptionHandler.ts";

class MockExceptionHandler implements ExceptionHandler {
  report(error: Error): void {}
  render(error: Error): Response {
    return new Response("Error");
  }
}

Deno.test("LoadExceptionHandler - should register exception handler", async () => {
  const app = new Application("");
  app.instance("config", { app: { exceptionHandler: MockExceptionHandler } });

  const loadExceptionHandler = new LoadExceptionHandler();
  await loadExceptionHandler.bootstrap(app);

  const handler = app.resolve<ExceptionHandler>("exceptionHandler");
  assertEquals(handler instanceof MockExceptionHandler, true);
});

Deno.test("LoadExceptionHandler - should use default handler if not specified in config", async () => {
  const app = new Application("");
  app.instance("config", { app: {} });

  const loadExceptionHandler = new LoadExceptionHandler();
  await loadExceptionHandler.bootstrap(app);

  const handler = app.resolve<ExceptionHandler>("exceptionHandler");
  assertEquals(handler instanceof RunTimeExceptionHandler, true);
});

Deno.test("LoadExceptionHandler - should throw error for invalid handler", async () => {
  const app = new Application("");
  app.instance("config", { app: { exceptionHandler: "InvalidHandler" } });

  const loadExceptionHandler = new LoadExceptionHandler();
  await assertRejects(
    async () => {
      await loadExceptionHandler.bootstrap(app);
    },
    Error,
    "Invalid exception handler specified in config"
  );
});
