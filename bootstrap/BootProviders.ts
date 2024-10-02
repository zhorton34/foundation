import { Application } from "../application.ts";

/**
 * BootProviders Bootstrapper
 * 
 * Boots all registered service providers.
 */
export class BootProviders {
  public bootstrap(app: Application): void {
    app.bootProviders();
  }
}
