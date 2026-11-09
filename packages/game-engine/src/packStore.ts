import fs from 'node:fs';
import path from 'node:path';
import {
  BUILT_IN_PACKS,
  summarizePack,
  validateContentPack,
  type ContentPack,
  type GameMode,
  type PackSummary
} from '@partynode/shared';

export class PackStore {
  private customPacks = new Map<string, ContentPack>();
  private readonly persistFilePath: string | null;

  constructor(persistFilePath: string | null = null) {
    this.persistFilePath = persistFilePath;
    if (this.persistFilePath) {
      this.loadFromDisk();
    }
  }

  private loadFromDisk(): void {
    if (!this.persistFilePath) return;
    try {
      if (fs.existsSync(this.persistFilePath)) {
        const raw = fs.readFileSync(this.persistFilePath, 'utf8');
        const parsed = JSON.parse(raw) as ContentPack[];
        if (Array.isArray(parsed)) {
          for (const p of parsed) {
            if (validateContentPack(p).valid) {
              this.customPacks.set(p.id, { ...p, builtIn: false });
            }
          }
        }
      }
    } catch (err) {
      console.warn('[PackStore] Failed to load custom packs:', err);
    }
  }

  private saveToDisk(): void {
    if (!this.persistFilePath) return;
    const dir = path.dirname(this.persistFilePath);
    fs.mkdirSync(dir, { recursive: true });
    const list = Array.from(this.customPacks.values());
    fs.writeFileSync(this.persistFilePath, JSON.stringify(list, null, 2), 'utf8');
  }

  public getAllPacks(): ContentPack[] {
    return [...BUILT_IN_PACKS, ...Array.from(this.customPacks.values())];
  }

  public getSummaries(familyFriendlyOnly = false): PackSummary[] {
    return this.getAllPacks()
      .filter((p) => (!familyFriendlyOnly ? true : p.familyFriendly))
      .map((p) => summarizePack(p));
  }

  public getPackById(id: string): ContentPack | undefined {
    const builtIn = BUILT_IN_PACKS.find((p) => p.id === id);
    if (builtIn) return builtIn;
    return this.customPacks.get(id);
  }

  public getDefaultPackForGame(game: GameMode, familyFriendly = false): ContentPack {
    const candidates = this.getAllPacks().filter(
      (p) => p.game === game && (!familyFriendly || p.familyFriendly)
    );
    return candidates[0] ?? BUILT_IN_PACKS.find((p) => p.game === game)!;
  }

  public upsertCustomPack(pack: ContentPack): { ok: boolean; error?: string; pack?: ContentPack } {
    if (BUILT_IN_PACKS.some((b) => b.id === pack.id)) {
      return { ok: false, error: 'Cannot overwrite a built-in starter pack. Use a new Pack ID.' };
    }
    const normalized: ContentPack = {
      ...pack,
      builtIn: false,
      updatedAt: new Date().toISOString()
    };
    const check = validateContentPack(normalized);
    if (!check.valid) {
      return { ok: false, error: check.error };
    }
    this.customPacks.set(normalized.id, normalized);
    this.saveToDisk();
    return { ok: true, pack: normalized };
  }

  public deleteCustomPack(packId: string): { ok: boolean; error?: string } {
    if (BUILT_IN_PACKS.some((b) => b.id === packId)) {
      return { ok: false, error: 'Built-in packs cannot be deleted.' };
    }
    if (!this.customPacks.has(packId)) {
      return { ok: false, error: 'Custom pack not found.' };
    }
    this.customPacks.delete(packId);
    this.saveToDisk();
    return { ok: true };
  }
}
