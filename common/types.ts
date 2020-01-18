export interface SharedData<E, R> {
  environmentData?: E;
  root?: R
};

export type Constructor<T = {}> = new (...args: any[]) => T;

export type WrapperItems = Map<string, SharedData<any, any>>;
