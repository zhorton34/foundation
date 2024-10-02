// src/providers/ServiceProvider.ts

import { Application } from "../application.ts";

/**
 * ServiceProvider Interface
 * 
 * Defines the structure for service providers.
 */
export interface IServiceProvider {
  /**
   * Register services with the application container.
   * 
   * @param app - The application instance.
   */
  register(app: Application): void;

  /**
   * Boot services after all providers have been registered.
   * 
   * @param app - The application instance.
   */
  boot(app: Application): void;
}


/**
 * ServiceProvider Class
 * 
 * This class serves as a base implementation for service providers within the application.
 * It implements the IServiceProvider interface, allowing for the registration and bootstrapping
 * of services in the application container.
 * 
 * @example
 * ```ts
 * class MyServiceProvider extends ServiceProvider {
 *   register(app: Application): void {
 *     // Register services with the application
 *     app.instance("myService", new MyService());
 *   }
 * 
 *   boot(app: Application): void {
 *     // Perform any additional setup after services have been registered
 *     const myService = app.resolve<MyService>("myService");
 *     myService.initialize();
 *   }
 * }
 * ```
 */
export class ServiceProvider implements IServiceProvider {
  /**
   * Creates an instance of the ServiceProvider.
   * 
   * @param app - The application instance that this service provider will register services with.
   * 
   * @example
   * ```ts
   * const app = new Application();
   * const provider = new MyServiceProvider(app);
   * ```
   */
  constructor(protected app: Application) {
    this.app = app;
    this.register();
  }

  /**
   * Register services with the application container.
   * 
   * This method should be overridden in derived classes to provide the actual
   * service registration logic. It is called automatically during the construction
   * of the ServiceProvider.
   * 
   * @throws {Error} Throws an error if not implemented in a derived class.
   * 
   * @example
   * ```ts
   * class MyServiceProvider extends ServiceProvider {
   *   register(): void {
   *     // Register services with the application
   *     app.instance("myService", new MyService());
   *   }
   * }
   * ```
   */
  register(): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Boot services after all providers have been registered.
   * 
   * This optional method can be overridden in derived classes to perform any
   * additional setup or initialization required for the services after they
   * have been registered. It is called after all service providers have been
   * registered with the application.
   * 
   * @throws {Error} Throws an error if not implemented in a derived class.
   * 
   * @example
   * boot(): void {
   *   throw new Error("Method not implemented.");
   * }
   */
  boot(): void {
    throw new Error("Method not implemented.");
  }
}
