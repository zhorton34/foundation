import { Container } from "@findhow/container";
import { ServiceProvider } from "./ServiceProvider.ts";

export interface IApplication extends Container {
  basePath: string;
  create(): Promise<this>;
  registerProvider(provider: ServiceProvider): void;
  bootProviders(): Promise<void>;
  getProviders(): ServiceProvider[];
}