import {
  fetchAllThreads,
  fetchThreadById,
  createThread,
  updateThread,
  deleteThread,
} from "../services/threadService.js";

export const getAllThreads = async (req, res) => {
  try {
    const threads = await fetchAllThreads();
    const output = {
      success: true,
      data: threads,
      message: "Threads fetched successfully",
    };
    return res.json(output);
  } catch (error) {
    console.log(error);
    const output = { success: false, message: "Failed to fetch threads" };
    return res.status(500).json(output);
  }
};

export const getThreadById = async (req, res) => {
  try {
    const thread = await fetchThreadById(req.params.id);
    if (!thread) {
      const output = { success: false, message: "Thread not found" };
      return res.status(404).json(output);
    }
    const output = {
      success: true,
      data: thread,
      message: "Thread fetched successfully",
    };
    return res.json(output);
  } catch (error) {
    console.log(error);
    const output = { success: false, message: "Failed to fetch thread" };
    return res.status(500).json(output);
  }
};

export const createNewThread = async (req, res) => {
  try {
    const { title, content, author, subreddit } = req.body;

    if (!title || !content || !author || !subreddit) {
      const output = { success: false, message: "Missing required fields" };
      return res.status(400).json(output);
    }

    const thread = await createThread({ title, content, author, subreddit });
    const output = {
      success: true,
      data: thread,
      message: "Thread created successfully",
    };
    return res.status(201).json(output);
  } catch (error) {
    console.log(error);
    const output = { success: false, message: "Failed to create thread" };
    return res.status(500).json(output);
  }
};

export const updateExistingThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const thread = await updateThread(req.params.id, { title, content });

    if (!thread) {
      const output = { success: false, message: "Thread not found" };
      return res.status(404).json(output);
    }

    const output = {
      success: true,
      data: thread,
      message: "Thread updated successfully",
    };
    return res.json(output);
  } catch (error) {
    console.log(error);
    const output = { success: false, message: "Failed to update thread" };
    return res.status(500).json(output);
  }
};

export const deleteExistingThread = async (req, res) => {
  try {
    const thread = await deleteThread(req.params.id);

    if (!thread) {
      const output = { success: false, message: "Thread not found" };
      return res.status(404).json(output);
    }

    const output = {
      success: true,
      message: "Thread deleted successfully",
    };
    return res.json(output);
  } catch (error) {
    console.log(error);
    const output = { success: false, message: "Failed to delete thread" };
    return res.status(500).json(output);
  }
};
