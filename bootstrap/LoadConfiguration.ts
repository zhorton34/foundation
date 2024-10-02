
import { Application } from "../application.ts";
import { Bootstrapper } from "./Bootstrapper.ts";
import { join } from "jsr:@std/path";

/**
 * LoadConfiguration Bootstrapper
 * 
 * Loads configuration files from the config directory and binds them to the container.
 */
export class LoadConfiguration implements Bootstrapper {
  async bootstrap(app: Application): Promise<void> {
    const configPath = join(app.basePath, "config");
    const configFiles: Record<string, any> = {};

    for await (const dirEntry of Deno.readDir(configPath)) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".ts")) {
        const filePath = join(configPath, dirEntry.name);
        const configKey = dirEntry.name.replace(/\.ts$/, "");
        // Use dynamic import without file:// prefix
        const module = await import(filePath);
        configFiles[configKey] = module.default;
      }
    }

    this.injectEnvVariables(configFiles);
    app.instance("config", configFiles);
  }

  private injectEnvVariables(config: Record<string, any>): void {
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === "object" && value !== null) {
        this.injectEnvVariables(value);
      } else if (typeof value === "string" && value.startsWith("${") && value.endsWith("}")) {
        const envKey = value.slice(2, -1);
        config[key] = Deno.env.get(envKey) || value;
      }
    }
  }
}
