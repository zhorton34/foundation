import { Container } from "@findhow/container";
import { ServiceProvider } from "./ServiceProvider.ts";

export interface Application extends Container {
  // Properties
  basePath: string;
  
  // Methods
  register(providers: ServiceProvider[]): void;
  boot(): Promise<void>;
  
  // Additional methods that might be needed based on the usage
  resolve<T>(abstract: any): T;
  resolveAsync<T>(abstract: any): Promise<T>;
  
  // Any other methods or properties that are used in the Application class
}