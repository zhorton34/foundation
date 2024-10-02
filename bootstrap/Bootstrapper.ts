import { Application } from "../application.ts";

/**
 * Bootstrapper Interface
 * 
 * This interface defines the structure for bootstrapper classes within the application.
 * A bootstrapper is responsible for initializing various components of the application,
 * such as loading environment variables, configurations, and registering services.
 * 
 * Implementing classes must provide a `bootstrap` method that accepts an instance of 
 * the `Application` class and returns a Promise that resolves when the bootstrapping 
 * process is complete.
 * 
 * @interface Bootstrapper
 */
export interface Bootstrapper {
  /**
   * Bootstrap the application by performing necessary initialization tasks.
   * 
   * @param app - The application instance to bootstrap.
   * @returns A Promise that resolves when the bootstrapping is complete.
   */
  bootstrap(app: Application): Promise<void>;
}