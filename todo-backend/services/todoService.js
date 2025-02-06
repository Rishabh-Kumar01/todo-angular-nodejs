import * as todoRepository from "../repositories/todoRepository.js";

export const getTodos = async (userId) => {
  return await todoRepository.findAll(userId);
};

export const createTodo = async (userId, todoData) => {
  return await todoRepository.create({ ...todoData, userId });
};

export const updateTodo = async (id, userId, todoData) => {
  return await todoRepository.update(id, userId, todoData);
};

export const deleteTodo = async (id, userId) => {
  return await todoRepository.remove(id, userId);
};
