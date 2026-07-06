export function renderMenu(items: any[]) {
  return (
    "PASSWORD MANAGER\n\n" +
    items.map((i) => `> ${i.title}`).join("\n") +
    "\n\n Cerca\n Nuovo"
  );
}