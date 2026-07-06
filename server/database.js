import Database from "better-sqlite3";

// Crea o apre il file del database SQLite
const db = new Database("database.sqlite");

// Crea la tabella se non esiste (notare la colonna 'title' al posto di 'site')
db.exec(`
  CREATE TABLE IF NOT EXISTS passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    username TEXT,
    password TEXT
  )
`);

export const database = {
  getAll: () => db.prepare("SELECT id, title, username FROM passwords").all(),

  getById: (id) => db.prepare("SELECT * FROM passwords WHERE id=?").get(id),

  insert: (t, u, p) => {
    const stmt = db.prepare(
      "INSERT INTO passwords (title, username, password) VALUES (?, ?, ?)",
    );
    const r = stmt.run(t, u, p);
    return r.lastInsertRowid;
  },

  update: (id, t, u, p) => {
    db.prepare(
      "UPDATE passwords SET title=?, username=?, password=? WHERE id=?",
    ).run(t, u, p, id);
  },

  remove: (id) => {
    db.prepare("DELETE FROM passwords WHERE id=?").run(id);
  },

  search: (q) =>
    db
      .prepare("SELECT id, title FROM passwords WHERE title LIKE ?")
      .all("%" + q + "%"),
};
