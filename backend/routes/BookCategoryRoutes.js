import express from "express";
import { deleteCategory, getCategory, getCategoryById, saveCategory, updateCategory } from "../controllers/BookCategoryController.js";

const router = express.Router();

router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);
router.post('/category', saveCategory);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;
