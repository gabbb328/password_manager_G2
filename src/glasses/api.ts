const BASE = "http://localhost:3000";

export async function getPasswords() {
  return fetch(`${BASE}/api/passwords`).then((r) => r.json());
}

export async function getPassword(id: number) {
  return fetch(`${BASE}/api/password/${id}`).then((r) => r.json());
}

export async function unlock(pin: string) {
  return fetch(`${BASE}/api/unlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  }).then((r) => r.json());
}
