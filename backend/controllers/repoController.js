import { Types } from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

// --- 1. CREATE REPO & GENERATE SITE ---
async function createRepository(req, res) {
  const { owner, name, description, visibility } = req.body;
  // (repoName,description,visibility,owner)

  try {
    if (!name) return res.status(400).json({ error: "Repository name is required!" });
    if (!Types.ObjectId.isValid(owner)) return res.status(400).json({ error: "Invalid User ID!" });

    // ✅ Initialize with a default 'index.html'
    const defaultCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #f4f4f9; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>🚀 ${name} is Live!</h1>
    <p>This website is hosted on <b>HamaraHub Cloud</b>.</p>
</body>
</html>
    `;

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content: [{ fileName: "index.html", code: defaultCode }],
      issues: [],
    });

    const result = await newRepository.save();

    // Generate Live URL
    const protocol = req.protocol;
    const host = req.get("host");
    const liveURL = `${protocol}://${host}/repo/view/${result._id}`;

    res.status(201).json({
      message: "Repository created and deployed!",
      repositoryID: result._id,
      deploymentUrl: liveURL 
    });

  } catch (err) {
    console.error("Error creating repo:", err.message);
    res.status(500).send("Server error");
  }
}

// --- 2. UPDATE / EDIT REPO FILES (Smart Update) ---
async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) return res.status(404).json({ error: "Repository not found!" });

    if (description) repository.description = description;

    // Smart Update: If file exists, update it. If not, add it.
    if (content && content.fileName && content.code) {
      const existingFileIndex = repository.content.findIndex(
        (f) => f.fileName === content.fileName
      );

      if (existingFileIndex !== -1) {
        // File exists: Update existing code
        repository.content[existingFileIndex].code = content.code;
      } else {
        // New File: Push to array
        repository.content.push(content);
      }
    }

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error updating repo:", err.message);
    res.status(500).send("Server error");
  }
}

// --- 3. SERVE THE WEBSITE (Hosting Engine) ---
async function serveRepository(req, res) {
  const { id } = req.params;
  
  try {
    const repo = await Repository.findById(id);
    if (!repo) return res.status(404).send("<h1>404 - Website Not Found</h1>");

    const file = repo.content.find(f => f.fileName === "index.html");
    if (!file) return res.status(404).send("<h1>No index.html found</h1>");

    res.setHeader('Content-Type', 'text/html');
    res.send(file.code);

  } catch (err) {
    console.error("Hosting Error:", err.message);
    res.status(500).send("Hosting Error");
  }
}

// --- STANDARD GET FUNCTIONS ---

async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({}).populate("owner");
    res.json(repositories);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function fetchRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findById(id).populate("owner");
    res.json(repository);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;
  try {
    const repository = await Repository.findOne({ name }).populate("owner");
    res.json(repository);
  } catch (err) {
    res.status(500).send("ewewew error");
  }
}

async function fetchRepositoriesForCurrentUser(req, res) {
  const { userID } = req.params;
  try {
    const repositories = await Repository.find({ owner: userID });
    res.json({ repositories });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function deleteRepositoryById(req, res) {
  const { id } = req.params;
  try {
    await Repository.findByIdAndDelete(id);
    res.json({ message: "Repository deleted!" });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function toggleVisibilityById(req, res) {
    const { id } = req.params;
    try {
      const repository = await Repository.findById(id);
      if (!repository) return res.status(404).json({ error: "Repository not found!" });
  
      repository.visibility = !repository.visibility;
      const updatedRepository = await repository.save();
      res.json({ message: "Repository visibility toggled!", repository: updatedRepository });
    } catch (err) {
      console.error("Error during toggling visibility : ", err.message);
      res.status(500).send("Server error");
    }
  }

export {
  createRepository,
  updateRepositoryById,
  serveRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  deleteRepositoryById,
  toggleVisibilityById
};