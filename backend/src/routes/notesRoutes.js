import express from "express"
import { getNoteById, createNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// All note routes now require authentication
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNoteById);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

export default router;