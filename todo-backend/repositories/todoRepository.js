import { Todo } from "../models/Todo.js";

export const findAll = async (userId) => {
  try {
    return await Todo.find({ userId }).sort({ createdAt: -1 });
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

export const update = async (id, userId, todoData) => {
  try {
    const updateFields = {};
    if (todoData.title !== undefined) updateFields.title = todoData.title;
    if (todoData.completed !== undefined)
      updateFields.completed = todoData.completed;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      updateFields,
      { new: true, runValidators: true }
    );
    if (!todo) throw new Error("Todo not found");
    return todo;
  } catch (error) {
    throw new Error("Error updating todo");
  }
};

export const remove = async (id, userId) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId });
    if (!todo) throw new Error("Todo not found");
    return todo;
  } catch (error) {
    throw new Error("Error deleting todo");
  }
};
