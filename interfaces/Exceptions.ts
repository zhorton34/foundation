export interface Exceptions {
  getHandler(errorName: string): ((error: Error) => Response) | undefined;
}