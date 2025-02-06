import { Todo } from "../models/Todo.js";

export const findAll = async () => {
  try {
    return await Todo.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error fetching todos");
  }
};

export const create = async (todoData) => {
  try {
    return await Todo.create(todoData);
  } catch (error) {
    throw new Error("Error creating todo");
  }
};

export const update = async (id, todoData) => {
  try {
    const updateFields = {};
    if (todoData.title !== undefined) updateFields.title = todoData.title;
    if (todoData.completed !== undefined)
      updateFields.completed = todoData.completed;

    const todo = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!todo) throw new Error("Todo not found");
    return todo;
  } catch (error) {
    throw new Error("Error updating todo");
  }
};

export const remove = async (id) => {
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) throw new Error("Todo not found");
    return todo;
  } catch (error) {
    throw new Error("Error deleting todo");
  }
};
