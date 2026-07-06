import crypto from "crypto";

const KEY = crypto.scryptSync("master_key", "salt", 32);

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);

  let enc = cipher.update(text, "utf8", "hex");
  enc += cipher.final("hex");

  const tag = cipher.getAuthTag();

  return iv.toString("hex") + ":" + enc + ":" + tag.toString("hex");
}

export function decrypt(data) {
  try {
    const [iv, enc, tag] = data.split(":");

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      KEY,
      Buffer.from(iv, "hex"),
    );

    decipher.setAuthTag(Buffer.from(tag, "hex"));

    let dec = decipher.update(enc, "hex", "utf8");
    dec += decipher.final("utf8");

    return dec;
  } catch (e) {
    return "Errore Decifratura";
  }
}
