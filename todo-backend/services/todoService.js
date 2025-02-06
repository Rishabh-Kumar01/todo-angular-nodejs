import * as todoRepository from "../repositories/todoRepository.js";

export const getTodos = async () => {
  return await todoRepository.findAll();
};

export const createTodo = async (userId, todoData) => {
  return await todoRepository.create({ ...todoData, userId });
};

export const updateTodo = async (id, todoData) => {
  return await todoRepository.update(id, todoData);
};

export const deleteTodo = async (id) => {
  return await todoRepository.remove(id);
};
