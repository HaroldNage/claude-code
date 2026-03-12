// auth.js — async/await authentication module (after refactor)

const crypto = require("crypto");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);

// Simulated DB — defined once, not recreated on every call
const users = {
  "jane@example.com": { id: 1, email: "jane@example.com", passwordHash: "hashed_secret" },
};

// Simulated DB lookup
async function findUserByEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users[email] || null), 50);
  });
}

// NOTE: SHA-256 is used here for demo purposes only.
// In production, use a password hashing algorithm like bcrypt or scrypt.
async function verifyPassword(password, hash) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const valid = crypto.createHash("sha256").update(password).digest("hex") === hash;
      resolve(valid);
    }, 30);
  });
}

async function generateToken() {
  const buf = await randomBytes(32);
  return buf.toString("hex");
}

async function saveSession(userId, token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Session saved for user ${userId}`);
      resolve({ userId, token, createdAt: new Date() });
    }, 40);
  });
}

// Login — flat, readable async/await
async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return { success: false, message: "User not found." };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { success: false, message: "Invalid password." };

  const token = await generateToken();
  const session = await saveSession(user.id, token);

  return { success: true, token: session.token };
}

// Logout
async function logout(token) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Token ${token} invalidated`);
      resolve({ success: true });
    }, 30);
  });
}

module.exports = { login, logout };
