import * as todoService from "../services/todoService.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.user._id);
    res.json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

export const addTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create todo",
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(
      req.params.id,
      req.user._id,
      req.body
    );
    res.json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to update todo",
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id, req.user._id);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to delete todo",
      error: error.message,
    });
  }
};
