import {
  fetchAllSubreddits,
  createNewSubreddit,
  fetchSubredditWithThreads,
} from "../services/subredditService.js";

export const getAllSubreddits = async (req, res) => {
  try{
    const subreddits = await fetchAllSubreddits();
    if(!subreddits) {
      const output = { success: false, message: "No subreddits found" };
      return res.status(404).json(output); // CANNOT BE FOUND
    }
    const output = { success: true, data: subreddits, message: "Subreddits fetched successfully" };
    res.json(output);
  } catch (error) {
    const output = { success: false, message: "Failed to fetch subreddits" };
    res.status(500).json(output);
  }
   
};

export const createSubreddit = async (req, res) => {
  try {
    if(!req.body.name) {
      const output = { success: false, message: "Subreddit name is missing" };
      return res.status(400).json(output); // BAD REQUEST
    }
    if(!req.body.author) {
      const output = { success: false, message: "Author is missing" };
      return res.status(400).json(output); // BAD REQUEST
    }

    const newSubreddit = await createNewSubreddit(req.body.name, req.body.description, req.body.author);
    if(!newSubreddit) {
      const output = { success: false, message: "Subreddit with this name already exists" };
      return res.status(409).json(output); // CONFLICT
    }
    const output = { success: true, data: newSubreddit, message: "Subreddit created successfully" };
    res.status(201).json(output); // CREATED
  } catch(error) {
    const output = { success: false, message: "Failed to create subreddit" };
    res.status(500).json(output);
  }
};

export const getSubredditWithThreads = async (req, res) => {
  // YOUR CODE HERE
  try{
    const subredditWithThreads = await fetchSubredditWithThreads(req.params.id);
    if(!subredditWithThreads) {
      const output = { success: false, message: "Subreddit not found" };
      return res.status(404).json(output); // CANNOT BE FOUND
    }
    const output = { success: true, data: subredditWithThreads, message: "Subreddit with threads fetched successfully" };
    res.json(output);
  } catch(error) {
    const output = { success: false, message: "Failed to fetch subreddit with threads" };
    return res.status(500).json(output);
  }
};
