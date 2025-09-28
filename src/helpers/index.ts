import crypto from "crypto";

const SECRET = process.env.SECRET;
if (!SECRET) {
  throw new Error("SECRET env variable is required");
}

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("base64");
};
