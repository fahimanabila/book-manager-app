import express from "express";
import { deleteList, getListByCategory, getListByDateRange, getListById, getLists, saveList, updateList } from "../controllers/BookListController.js";

const router = express.Router();

router.get('/book', getLists);
router.get('/book/:id', getListById);
router.get('/filter', getListByDateRange);
router.get('/filtercat', getListByCategory);
router.post('/book', saveList);
router.patch('/book/:id', updateList);
router.delete('/book/:id', deleteList);

export default router;
