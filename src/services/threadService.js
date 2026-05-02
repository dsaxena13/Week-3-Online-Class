import Thread from "../models/Thread.js";

export const fetchAllThreads = async () => {
  const threads = await Thread.find()
    .populate("author", "name email")
    .populate("subreddit", "name");
  return threads;
};

export const fetchThreadById = async (id) => {
  const thread = await Thread.findById(id)
    .populate("author", "name email")
    .populate("subreddit", "name");
  return thread;
};

export const createThread = async (data) => {
  const newThread = await Thread.create(data);
  return newThread;
};

export const updateThread = async (id, data) => {
  const existingThread = await Thread.findById(id);
  if (!existingThread) {
    return null;
  }
  
  const updatedThread = await Thread.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("author", "name email")
    .populate("subreddit", "name");
  return updatedThread;
};

export const deleteThread = async (id) => {
  const existingThread = await Thread.findById(id);
  if (!existingThread) {
    return null;
  }
  const deletedThread = await Thread.findByIdAndDelete(id);
  return deletedThread;
};
