import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Application } from "../mod.ts";
import { LoadEnvironmentVariables } from "./LoadEnvironmentVariables.ts";
import { join } from "jsr:@std/path";

const mockBasePath = "/mock/base/path";

// Mock file system
const mockFileSystem = new Map<string, string>([
  [join(mockBasePath, ".env"), "APP_ENV=production\nAPP_DEBUG=false"],
  [join(mockBasePath, ".env.defaults"), "APP_ENV=development\nAPP_DEBUG=true"],
]);

// Mock Deno.readTextFile
const originalReadTextFile = Deno.readTextFile;
Deno.readTextFile = async (path: string | URL) => {
  const content = mockFileSystem.get(path.toString());
  if (content) return content;
  throw new Deno.errors.NotFound(`File not found: ${path}`);
};

Deno.test("LoadEnvironmentVariables", async () => {
  const app = new Application(mockBasePath);
  const loader = new LoadEnvironmentVariables();

  await loader.bootstrap(app);

  const env = app.resolve<Record<string, string>>("env");
  assertEquals(env.APP_ENV, "production");
  assertEquals(env.APP_DEBUG, "false");
});

// Clean up mocks after tests
Deno.test({
  name: "Clean up mocks",
  fn() {
    Deno.readTextFile = originalReadTextFile;
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
