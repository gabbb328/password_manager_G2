import { useState } from "react";

interface SearchPasswordProps {
  passwords: any[];
  onDelete: (id: number) => void;
}

export function SearchPassword({ passwords, onDelete }: SearchPasswordProps) {
  const [search, setSearch] = useState("");
  const [decryptedMap, setDecryptedMap] = useState<Record<number, string>>({});

  const revealPassword = async (id: number) => {
    if (decryptedMap[id]) return; // Già decifrata
    const res = await fetch(`http://localhost:3000/api/password/${id}`);
    const data = await res.json();
    setDecryptedMap((prev) => ({ ...prev, [id]: data.password }));
  };

  const filtered = passwords.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Credenziali Salvate</h3>
      <input
        type="text"
        placeholder="Cerca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "15px",
          boxSizing: "border-box",
        }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Sito</th>
            <th style={{ padding: "10px" }}>Username</th>
            <th style={{ padding: "10px" }}>Password</th>
            <th style={{ padding: "10px" }}>Azione</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{p.title}</td>
              <td style={{ padding: "10px" }}>{p.username}</td>
              <td style={{ padding: "10px" }}>
                {decryptedMap[p.id] ? (
                  <span style={{ color: "red", fontFamily: "monospace" }}>
                    {decryptedMap[p.id]}
                  </span>
                ) : (
                  <button
                    onClick={() => revealPassword(p.id)}
                    style={{
                      padding: "2px 8px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    👁️ Mostra
                  </button>
                )}
              </td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => onDelete(p.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  ❌ Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
