import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Application } from "../application.ts";
import { ServiceProvider } from "../interfaces/ServiceProvider.ts";

class TestProvider implements ServiceProvider {
  register(): void {
    // Register logic
  }

  async boot(): Promise<void> {
    // Boot logic
  }
}

Deno.test("RegisterProviders", () => {
  const app = Application.configure({ basePath: "./test" });
  const providerInstance = new TestProvider();
  app.registerProvider(providerInstance);
  
  // Add assertions here to check if the provider was registered correctly
  assertEquals((app as any).serviceProviders.length, 1);
  assertEquals((app as any).serviceProviders[0], providerInstance);
});
