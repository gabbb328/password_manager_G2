import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { AddPassword } from "./AddPassword";
import { SearchPassword } from "./SearchPassword";

export function WebsiteMain() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwords, setPasswords] = useState<any[]>([]);

  const loadData = () => {
    fetch("http://localhost:3000/api/passwords")
      .then((res) => res.json())
      .then((data) => setPasswords(data));
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    loadData();

    // Ascolta il WebSocket del server per aggiornarsi senza ricaricare la pagina!
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "update") {
        loadData();
      }
    };

    return () => ws.close();
  }, [isLoggedIn]);

  const handleDelete = async (id: number) => {
    if (confirm("Vuoi davvero eliminare questa password?")) {
      await fetch(`http://localhost:3000/api/password/${id}`, {
        method: "DELETE",
      });
    }
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "0 auto" }}>
      <h2>🌐 Pannello di Amministrazione Web</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "25px",
          marginTop: "20px",
        }}
      >
        <AddPassword />
        <SearchPassword passwords={passwords} onDelete={handleDelete} />
      </div>
    </div>
  );
}
