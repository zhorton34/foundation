import { load } from "jsr:@std/dotenv";
import { join } from "jsr:@std/path";
import { Application } from "../mod.ts";
import { Bootstrapper } from "./Bootstrapper.ts";
/**
 * LoadEnvironmentVariables Bootstrapper
 * 
 * Loads environment variables from a .env file into the application.
 */
export class LoadEnvironmentVariables implements Bootstrapper {
  public async bootstrap(app: Application): Promise<void> {
    const envPath = join(app.basePath, ".env");
    const defaultsPath = join(app.basePath, ".env.defaults");
    
    try {
      // Load .env file
      const envVars = await load({ envPath, export: false });
      
      // Load .env.defaults file if it exists
      try {
        const defaultVars = await load({ envPath: defaultsPath, export: false });
        // Merge default variables with .env variables, giving priority to .env
        const mergedEnv = { ...defaultVars, ...envVars };
        app.instance("env", mergedEnv);
      } catch (defaultError) {
        // If .env.defaults doesn't exist, just use the .env variables
        app.instance("env", envVars);
      }
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }
      // If .env file is not found, use an empty object
      app.instance("env", {});
    }
  }
}