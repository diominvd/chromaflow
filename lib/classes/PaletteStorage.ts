import { ColorPalette } from '@/types';

export class PaletteStorage {
  private readonly key: string = 'chromaflow'

  save(elements: ColorPalette): void {
    localStorage.setItem(this.key, JSON.stringify(elements));
  }

  load(): ColorPalette | null {
    try {
      const cached = localStorage.getItem(this.key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      throw new Error(`Cache load failed: ${error}`);
      return null;
    }
  }

  remove(): void {
    localStorage.removeItem(this.key)
  }
}
