export interface StorageService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, data: T): Promise<void>;
  contains(key: string): Promise<boolean>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
