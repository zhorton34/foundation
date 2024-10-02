import { Application } from "../application.ts";

const app = new Application(
  Deno.cwd()
)
.withRouting({
  web: "./routes/web.ts",
  commands: "./routes/commands.ts",
  health: "./routes/health.ts",
})
// .withMiddleware({
//   global: [
//     new Middleware()
//   ]
// });

export default app;