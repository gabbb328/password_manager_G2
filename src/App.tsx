import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { WebsiteMain } from "./website/WebsiteMain";
// Questo import ora funzionerà perché glasses è dentro src/
import { renderMenu } from "./glasses/menu";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#fafafa" }}>
        {/* Barra di Navigazione di Debug (per saltare tra sito e visore dal PC) */}
        <nav
          style={{
            padding: "15px",
            background: "#333",
            color: "#fff",
            display: "flex",
            gap: "20px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🌐 Vai al Sito Web
          </Link>
          <Link
            to="/glasses"
            style={{
              color: "#00ffff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            🕶️ Vista Occhiali G2
          </Link>
        </nav>

        <Routes>
          {/* Carica l'applicazione Web */}
          <Route path="/" element={<WebsiteMain />} />

          {/* Carica l'interfaccia degli occhiali */}
          <Route path="/glasses" element={<GlassesComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

function GlassesComponent() {
  // Assicurati che renderMenu in glasses/menu.ts restituisca qualcosa di renderizzabile o JSX
  return <>{renderMenu()}</>;
}

export default App;
