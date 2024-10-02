export interface ServiceProvider {
  register(): void;
  boot?(): Promise<void>;
}