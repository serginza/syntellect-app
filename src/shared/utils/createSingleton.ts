export const createSingleton = <T>(Class: new () => T): T => {
  let instance: T | null = null;

  return instance ?? (instance = new Class());
};
