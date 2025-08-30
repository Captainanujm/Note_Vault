// routes/notes.ts
import { Router } from "express";
import Note from "../models/Notes";
import { AuthRequest, authMiddleware } from "../middleware/authmid";

const router = Router();

// Create a note
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content required" });

  const note = await Note.create({ user: req.user!.id, content });
  res.status(201).json(note);
});

// Get all notes of the user
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const notes = await Note.find({ user: req.user!.id }).sort({ createdAt: -1 });
 res.json({
      user: {
        id: req.user!.id,
        email: req.user!.email,
        name: req.user!.name,
      },
      notes,
    });
});

// Delete a note
router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
});

export default router;
