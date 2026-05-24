import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Auth, authState } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * DatabaseService — maneja SQLite para nativo y localStorage como fallback en web.
 *
 * ESTRATEGIA DUAL:
 *  - Web (ionic serve): usa localStorage con clave 'favoritos_<uid>' (array JSON de IDs)
 *  - Nativo (Android/iOS): usa @capacitor-community/sqlite con tabla `favoritos`
 *
 * Los favoritos son POR USUARIO: cada UID tiene su propia clave/tabla.
 */
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly DB_NAME = 'webcine.db';
  private currentUid: string | null = null;

  private favoritosSubject = new BehaviorSubject<string[]>([]);
  public favoritos$: Observable<string[]> = this.favoritosSubject.asObservable();

  constructor(private auth: Auth) {
    this.isWeb = Capacitor.getPlatform() === 'web';

    // Escuchar cambios de sesión para actualizar el UID activo y emitir favoritos
    authState(this.auth).subscribe(async user => {
      this.currentUid = user?.uid ?? null;
      const favs = await this.getFavoritos();
      this.favoritosSubject.next(favs);
    });
  }

  /** Devuelve la clave de localStorage específica del usuario activo */
  private getStorageKey(): string {
    return this.currentUid ? `favoritos_${this.currentUid}` : 'favoritos_anonymous';
  }

  /** Inicializa la BD. Llamar una vez al arrancar la app (en App.ngOnInit). */
  async initDb(): Promise<void> {
    if (this.isWeb) {
      await this.initWebFallback();
    } else {
      await this.initNativeDb();
    }
    const favs = await this.getFavoritos();
    this.favoritosSubject.next(favs);
  }

  // ──────────────── INICIALIZACIÓN NATIVA ────────────────

  private async initNativeDb(): Promise<void> {
    try {
      const ret = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection(this.DB_NAME, false)).result;

      if (isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
      } else {
        this.db = await this.sqlite.createConnection(
          this.DB_NAME,
          false,
          'no-encryption',
          1,
          false
        );
      }

      await this.db.open();
      await this.crearTablaFavoritos();
      console.log('[DB] SQLite nativo inicializado correctamente.');
    } catch (err) {
      console.error('[DB] Error al inicializar SQLite nativo:', err);
    }
  }

  private async initWebFallback(): Promise<void> {
    try {
      const jeepEl = document.querySelector('jeep-sqlite');
      if (!jeepEl) {
        throw new Error('jeep-sqlite no está en el DOM');
      }
      await customElements.whenDefined('jeep-sqlite');
      await this.sqlite.initWebStore();

      const isConn = (await this.sqlite.isConnection(this.DB_NAME, false)).result;
      if (isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
      } else {
        this.db = await this.sqlite.createConnection(
          this.DB_NAME,
          false,
          'no-encryption',
          1,
          false
        );
      }
      await this.db.open();
      await this.crearTablaFavoritos();
      console.log('[DB] jeep-sqlite (web) inicializado correctamente.');
    } catch (err) {
      // Si jeep-sqlite no está disponible, usamos localStorage puro como fallback final
      console.warn('[DB] jeep-sqlite no disponible, usando localStorage como fallback.', err);
      this.db = null;
    }
  }

  // ──────────────── TABLA ────────────────

  async crearTablaFavoritos(): Promise<void> {
    if (!this.db) return;
    const sql = `
      CREATE TABLE IF NOT EXISTS favoritos (
        id TEXT NOT NULL,
        uid TEXT NOT NULL,
        PRIMARY KEY (id, uid)
      );
    `;
    await this.db.execute(sql);
  }

  // ──────────────── CRUD FAVORITOS ────────────────

  /** Añade una película a favoritos del usuario actual */
  async addFavorito(id: string): Promise<void> {
    const uid = this.currentUid ?? 'anonymous';
    if (this.db) {
      await this.db.run(`INSERT OR IGNORE INTO favoritos (id, uid) VALUES (?, ?);`, [id, uid]);
      if (this.isWeb) await this.sqlite.saveToStore(this.DB_NAME);
    } else {
      const favs = this.getFavoritosLocal();
      if (!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem(this.getStorageKey(), JSON.stringify(favs));
      }
    }
    const updated = await this.getFavoritos();
    this.favoritosSubject.next(updated);
  }

  /** Elimina una película de favoritos del usuario actual */
  async removeFavorito(id: string): Promise<void> {
    const uid = this.currentUid ?? 'anonymous';
    if (this.db) {
      await this.db.run(`DELETE FROM favoritos WHERE id = ? AND uid = ?;`, [id, uid]);
      if (this.isWeb) await this.sqlite.saveToStore(this.DB_NAME);
    } else {
      const favs = this.getFavoritosLocal().filter((f) => f !== id);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(favs));
    }
    const updated = await this.getFavoritos();
    this.favoritosSubject.next(updated);
  }

  /** Comprueba si una película es favorita del usuario actual */
  async isFavorito(id: string): Promise<boolean> {
    const uid = this.currentUid ?? 'anonymous';
    if (this.db) {
      const res = await this.db.query(`SELECT id FROM favoritos WHERE id = ? AND uid = ?;`, [id, uid]);
      return (res.values?.length ?? 0) > 0;
    } else {
      return this.getFavoritosLocal().includes(id);
    }
  }

  /** Devuelve todos los IDs de favoritos del usuario actual */
  async getFavoritos(): Promise<string[]> {
    const uid = this.currentUid ?? 'anonymous';
    if (this.db) {
      const res = await this.db.query(`SELECT id FROM favoritos WHERE uid = ?;`, [uid]);
      return (res.values ?? []).map((row: any) => row.id as string);
    } else {
      return this.getFavoritosLocal();
    }
  }

  // ──────────────── HELPERS ────────────────

  private getFavoritosLocal(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.getStorageKey()) ?? '[]') as string[];
    } catch {
      return [];
    }
  }
}
