// src/application.ts

import { Container } from "@findhow/container";
import { LoadEnvironmentVariables } from "./bootstrap/LoadEnvironmentVariables.ts";
import { LoadConfiguration } from "./bootstrap/LoadConfiguration.ts";
import { IApplication } from "./interfaces/IApplication.ts";
import { ServiceProvider } from "./interfaces/ServiceProvider.ts";
import { LoadExceptionHandler } from "./bootstrap/LoadExceptionHandler.ts";

interface Bootstrapper {
  bootstrap(app: Application): Promise<void>;
}

/**
 * Application Class
 * 
 * Extends the Container to bootstrap environment variables, configurations,
 * register service providers, and initialize services.
 */
export class Application extends Container implements IApplication {
  protected bootstrappers: Bootstrapper[] = [
    new LoadEnvironmentVariables(),
    new LoadConfiguration(),
    new LoadExceptionHandler(),
  ];
  private serviceProviders: ServiceProvider[] = [];
  private isBootstrapped = false;

  constructor(public basePath: string) {
    super();
  }

  /**
   * Configure the application with initial settings.
   * 
   * @param config - Configuration settings such as basePath.
   * @returns The Application instance for chaining.
   */
  public static configure(config: { basePath: string }): Application {
    const app = new Application(config.basePath);
    app.instance("config", { basePath: config.basePath });
    return app;
  }

  /**
   * Configure routing paths.
   * 
   * @param routes - Routing configurations.
   * @returns The Application instance for chaining.
   */
  public withRouting(routes: { web: string; commands: string; health: string }): this {
    this.instance("routes", routes);
    return this;
  }

  /**
   * Create and finalize the application instance.
   * 
   * @returns The Application instance.
   */
  public async create(): Promise<this> {
    await this.bootstrap();
    return this;
  }

  /**
   * Bootstrap the application by running all bootstrappers.
   */
  private async bootstrap(): Promise<void> {
    if (this.isBootstrapped) {
      return;
    }

    this.isBootstrapped = true;

    for (const loadable of this.bootstrappers) {
      await loadable.bootstrap(this);
    }
  }

  /**
   * Register a service provider.
   * 
   * @param provider - The service provider to register.
   */
  public registerProvider(provider: ServiceProvider): void {
    this.serviceProviders.push(provider);
    provider.register();
  }

  /**
   * Boot all registered service providers.
   */
  public async bootProviders(): Promise<void> {
    for (const provider of this.serviceProviders) {
      if (typeof provider.boot === "function") {
        await provider.boot();
      }
    }
  }

  public getProviders(): ServiceProvider[] {
    return this.serviceProviders;
  }
}
