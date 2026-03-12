// api.js — User profiles REST API (Express)
// GET  /api/profiles/:userId  — fetch a user's profile
// PUT  /api/profiles/:userId  — update a user's profile

const express = require("express");
const router  = express.Router();

// In-memory store simulating a DB (replace with real DB queries in production)
const profiles = new Map([
  [1, {
    id: 1, userId: 1, displayName: "Jane Doe", bio: "Software engineer.",
    avatarUrl: "", website: "https://janedoe.dev", location: "San Francisco, CA",
    birthDate: "1990-06-15", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  }],
]);

const ALLOWED_FIELDS = ["displayName", "bio", "avatarUrl", "website", "location", "birthDate"];

function validateProfile(data) {
  const errors = [];
  if (data.displayName !== undefined) {
    if (typeof data.displayName !== "string" || !data.displayName.trim())
      errors.push("displayName must be a non-empty string.");
    if (data.displayName.length > 100)
      errors.push("displayName must be 100 characters or fewer.");
  }
  if (data.website !== undefined && data.website) {
    try { new URL(data.website); } catch { errors.push("website must be a valid URL."); }
  }
  if (data.avatarUrl !== undefined && data.avatarUrl) {
    try { new URL(data.avatarUrl); } catch { errors.push("avatarUrl must be a valid URL."); }
  }
  if (data.birthDate !== undefined && data.birthDate) {
    if (isNaN(Date.parse(data.birthDate))) errors.push("birthDate must be a valid date (YYYY-MM-DD).");
  }
  return errors;
}

// GET /api/profiles/:userId
router.get("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID." });

  const profile = profiles.get(userId);
  if (!profile) return res.status(404).json({ error: "Profile not found." });

  res.json(profile);
});

// PUT /api/profiles/:userId
router.put("/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID." });

  const profile = profiles.get(userId);
  if (!profile) return res.status(404).json({ error: "Profile not found." });

  // Only allow known fields
  const updates = {};
  for (const field of ALLOWED_FIELDS) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const errors = validateProfile(updates);
  if (errors.length) return res.status(422).json({ errors });

  const updated = { ...profile, ...updates, updatedAt: new Date().toISOString() };
  profiles.set(userId, updated);

  res.json(updated);
});

// Mount and start
const app = express();
app.use(express.json());
app.use("/api/profiles", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

module.exports = app;
