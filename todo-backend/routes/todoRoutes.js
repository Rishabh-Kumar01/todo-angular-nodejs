import express from 'express';
import * as todoController from '../controllers/todoController.js';

const router = express.Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.addTodo);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
