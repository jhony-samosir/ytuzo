import * as SQLite from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        sync_status INTEGER DEFAULT 0
      );
    `);
    
    // Seed dummy data on first run
    const now = Date.now();
    await db.execAsync(`
      INSERT INTO transactions (id, title, subtitle, amount, type, icon, color, created_at, updated_at, sync_status) VALUES
      ('tx-1', 'Dribbble Pro', 'Subscription', 12.00, 'EXPENSE', 'logo-dribbble', '#F43F5E', ${now}, ${now}, 0),
      ('tx-2', 'Salary', 'Income', 3200.00, 'INCOME', 'briefcase', '#10B981', ${now-1000}, ${now-1000}, 0),
      ('tx-3', 'Coffee Shop', 'Food & Beverage', 4.50, 'EXPENSE', 'cafe', '#FACC15', ${now-2000}, ${now-2000}, 0);
    `);
    
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}
