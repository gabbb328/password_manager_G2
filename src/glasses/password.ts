export function renderPassword(p: any, unlocked: boolean) {
  return `
${p.title}

User: ${p.username}

Password:
${unlocked ? p.password : "••••••••••"}

Tap to unlock
`;
}
