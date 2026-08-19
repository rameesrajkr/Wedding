import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DATA_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvp.json");
const GUESTBOOK_FILE = path.join(DATA_DIR, "guestbook.json");

// Ensure data files exist
function initDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(RSVP_FILE)) {
    fs.writeFileSync(RSVP_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(GUESTBOOK_FILE)) {
    fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify([
      {
        id: "1",
        name: "Sarah & David",
        relation: "Family",
        message: "Wishing you both a lifetime of love, laughter, and endless happiness. We cannot wait to celebrate this beautiful day with you! ❤️",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 * 3).toISOString()
      },
      {
        id: "2",
        name: "Marcus Chen",
        relation: "Friend of Groom",
        message: "So incredibly happy for you guys! It seems like yesterday we were talking about this day, and now it's finally here. Count me in!",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: "3",
        name: "Elena Rostova",
        relation: "Friend of Bride",
        message: "You are going to be the most gorgeous bride! Sending all my love and best wishes from afar. See you very soon!",
        createdAt: new Date().toISOString()
      }
    ], null, 2));
  }
}

async function startServer() {
  initDataFiles();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get all guestbook entries
  app.get("/api/guestbook", (req, res) => {
    try {
      const data = fs.readFileSync(GUESTBOOK_FILE, "utf-8");
      const entries = JSON.parse(data);
      // Sort with newest first
      entries.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json(entries);
    } catch (err) {
      console.error("Error reading guestbook:", err);
      res.status(500).json({ error: "Failed to read guestbook" });
    }
  });

  // Add guestbook entry
  app.post("/api/guestbook", (req, res) => {
    try {
      const { name, message, relation } = req.body;
      if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required" });
      }

      const data = fs.readFileSync(GUESTBOOK_FILE, "utf-8");
      const entries = JSON.parse(data);

      const newEntry = {
        id: Date.now().toString(),
        name,
        relation: relation || "Well-wisher",
        message,
        createdAt: new Date().toISOString()
      };

      entries.push(newEntry);
      fs.writeFileSync(GUESTBOOK_FILE, JSON.stringify(entries, null, 2));

      res.status(201).json(newEntry);
    } catch (err) {
      console.error("Error writing guestbook:", err);
      res.status(500).json({ error: "Failed to add guestbook entry" });
    }
  });

  // Get all RSVPs
  app.get("/api/rsvp", (req, res) => {
    try {
      const data = fs.readFileSync(RSVP_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      console.error("Error reading rsvp:", err);
      res.status(500).json({ error: "Failed to read RSVPs" });
    }
  });

  // Submit RSVP
  app.post("/api/rsvp", (req, res) => {
    try {
      const { name, email, attending, guests, dietary, message } = req.body;
      if (!name || !email || attending === undefined) {
        return res.status(400).json({ error: "Name, email, and attendance response are required" });
      }

      const data = fs.readFileSync(RSVP_FILE, "utf-8");
      const rsvps = JSON.parse(data);

      const newRsvp = {
        id: Date.now().toString(),
        name,
        email,
        attending: attending === "yes",
        guests: attending === "yes" ? (parseInt(guests) || 1) : 0,
        dietary: dietary || "",
        message: message || "",
        createdAt: new Date().toISOString()
      };

      rsvps.push(newRsvp);
      fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2));

      res.status(201).json({ success: true, data: newRsvp });
    } catch (err) {
      console.error("Error writing rsvp:", err);
      res.status(500).json({ error: "Failed to save RSVP" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
