/**
 * Safe localStorage wrapper with in-memory fallback
 * Prevents SecurityError or crashes in restricted environments (Vercel, GitHub Pages, Safari Private, iframes)
 */
class SafeStorage {
  private memoryFallback: Map<string, string> = new Map();
  private isAvailable: boolean;

  constructor() {
    this.isAvailable = this.checkAvailability();
  }

  private checkAvailability(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    try {
      const testKey = '__sl_test_storage__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public getItem(key: string): string | null {
    try {
      if (this.isAvailable) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Fallback to memory
    }
    return this.memoryFallback.get(key) ?? null;
  }

  public setItem(key: string, value: string): void {
    try {
      if (this.isAvailable) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch {
      // Fallback to memory
    }
    this.memoryFallback.set(key, value);
  }

  public removeItem(key: string): void {
    try {
      if (this.isAvailable) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Fallback to memory
    }
    this.memoryFallback.delete(key);
  }

  public clear(): void {
    try {
      if (this.isAvailable) {
        window.localStorage.clear();
      }
    } catch {
      // Fallback to memory
    }
    this.memoryFallback.clear();
  }
}

export const safeStorage = new SafeStorage();
