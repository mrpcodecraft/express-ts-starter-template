declare module "q" {
  export interface Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: unknown) => void;
    notify: (progress: unknown) => void;
  }

  export function defer<T>(): Deferred<T>;

  const q: {
    defer: typeof defer;
  };

  export default q;
}
