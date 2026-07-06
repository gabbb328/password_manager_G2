import React, { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [pin, setPin] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    const data = await response.json();
    if (data.ok) {
      onLogin();
    } else {
      alert("PIN Errato! Inserisci 1234.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "350px",
        margin: "100px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h3>🔒 Sblocca Cassaforte</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Inserisci PIN di sblocco"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            textAlign: "center",
            fontSize: "18px",
            letterSpacing: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sblocca
        </button>
      </form>
    </div>
  );
}
