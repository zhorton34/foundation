import { Application } from "../application.ts";
import { ServiceProvider } from "../interfaces/ServiceProvider.ts";

/**
 * RegisterProviders Bootstrapper
 * 
 * Registers all service providers defined in the application's configuration.
 */
export class RegisterProviders {
  public async bootstrap(app: Application): Promise<void> {
    const config = app.resolve<Record<string, any>>("config");
    const providers: string[] = config?.app?.providers || [];

    for (const providerPath of providers) {
      try {
        // Dynamically import the provider
        const module = await import(providerPath);
        const ProviderClass = module.default;
        const providerInstance = new ProviderClass() as ServiceProvider;

        await app.registerProvider(providerInstance);
      } catch (error) {
        console.error(`Error registering provider: ${providerPath}`, error);
      }
    }
  }
}
