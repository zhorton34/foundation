import { join } from "jsr:@std/path";
import { Application } from "../application.ts";
import { LoadConfiguration } from "./LoadConfiguration.ts";
import { assertEquals, assertExists } from "jsr:@std/assert";

const mockBasePath = "/mock/base/path";
const mockConfigPath = join(mockBasePath, "config");

// Mock file system
const mockFileSystem = new Map<string, string>([
  [join(mockConfigPath, "app.ts"), `export default { name: "TestApp", env: Deno.env.get('APP_ENV') }`],
  [join(mockConfigPath, "database.ts"), `export default { default: "mysql" }`],
]);

// Mock Deno.readDir
const originalReadDir = Deno.readDir;
Deno.readDir = async function* (path: string | URL) {
  if (path.toString() === mockConfigPath) {
    for (const [filePath] of mockFileSystem) {
      yield { name: filePath.split("/").pop()!, isFile: true, isDirectory: false, isSymlink: false };
    }
  } else {
    throw new Deno.errors.NotFound(`Directory not found: ${path}`);
  }
};

// Mock import
const originalImport = (globalThis as any).import;
// @ts-ignore: Ignore the type error for now
globalThis.import = async (path: string) => {
  const content = mockFileSystem.get(path);
  if (content) {
    return { default: eval(`(${content})`) };
  }
  throw new Error(`Module not found: ${path}`);
};

Deno.test.ignore("Application should load configuration and inject environment variables", async () => {
  const app = new Application(mockBasePath);

  // Mock environment variables
  const originalEnvGet = Deno.env.get;
  Deno.env.get = (key: string): string | undefined => {
    const mockEnv: Record<string, string> = {
      APP_ENV: "production",
    };
    return mockEnv[key];
  };

  const loadConfig = new LoadConfiguration();
  await loadConfig.bootstrap(app);

  const config = app.resolve<Record<string, any>>("config");
  assertExists(config);
  assertEquals(config.app.name, "TestApp");
  assertEquals(config.app.env, "production");
  assertEquals(config.database.default, "mysql");

  // Restore original Deno.env.get
  Deno.env.get = originalEnvGet;
});

// Clean up mocks after tests
Deno.test({
  name: "Clean up mocks",
  fn() {
    Deno.readDir = originalReadDir;
    // @ts-ignore: Ignore the type error for now
    globalThis.import = originalImport;
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
