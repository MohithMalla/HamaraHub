import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws-config.js";

const BUCKET = "mohith-github01"; // Ensure this is your actual bucket name

async function readObject(key) {
  console.log(`[S3 DEBUG] Attempting to read object with key: ${key}`);
  const cmd = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const res = await s3.send(cmd);
  return Buffer.from(await res.Body.transformToByteArray());
}

async function readTree(userId, repo, hash) {
  console.log(`[S3 DEBUG] Reading tree for hash: ${hash}`);
  const key = `users/${userId}/repos/${repo}/obj/${hash}`;
  const raw = await readObject(key);

  const nullIndex = raw.indexOf(0);
  const content = raw.slice(nullIndex + 1).toString();

  const node = {
    name: "root",
    type: "folder",
    children: [],
  };

  for (const line of content.split("\n")) {
    if (!line.trim()) continue;

    const [mode, name, childHash] = line.split(" ");

    if (mode === "40000") {
      // folder
      const childTree = await readTree(userId, repo, childHash);
      childTree.name = name;
      node.children.push(childTree);
    } else {
      // file
      node.children.push({
        name,
        type: "file",
        hash: childHash,
      });
    }
  }

  return node;
}

async function readBlob(userId, repo, hash) {
  console.log(`[S3 DEBUG] Reading blob for hash: ${hash}`);
  const key = `users/${userId}/repos/${repo}/obj/${hash}`;
  const raw = await readObject(key);

  const nullIndex = raw.indexOf(0);
  const content = raw.slice(nullIndex + 1);

  return content.toString("utf-8");
}

async function getHeadCommit(userId, repo, branch = "main") {
  const key = `users/${userId}/repos/${repo}/ref/branches/${branch}/head`;
  console.log(`[S3 DEBUG] Fetching head commit from key: ${key}`);
  
  const raw = await readObject(key);
  const text = raw.toString().trim();

  if (!text) throw new Error("No commits yet");

  // format: "<hash>\t<message>"
  const commitHash = text.split("\t")[0];
  console.log(`[S3 DEBUG] Found Head Commit Hash: ${commitHash}`);
  return commitHash;
}

async function getTreeHash(userId, repo, commitHash) {
  const key = `users/${userId}/repos/${repo}/obj/${commitHash}`;
  console.log(`[S3 DEBUG] Fetching tree hash from commit key: ${key}`);
  
  const raw = await readObject(key);
  const nullIndex = raw.indexOf(0);
  const content = raw.slice(nullIndex + 1).toString();

  const firstLine = content.split("\n")[0];
  const treeHash = firstLine.split(" ")[1];
  
  console.log(`[S3 DEBUG] Found Tree Hash: ${treeHash}`);
  return treeHash;
}

const getRepoTree = async (req, res) => {
  const { userId, repo,branch,commitHash } = req.query;
  console.log(`\n--- [API HIT] /repo/getrepo ---`);
  console.log(`[DEBUG] Received Query Params -> userId: "${userId}", repo: "${repo}", branch: "${branch}"`);
  if (!commitHash || commitHash === "undefined") {
    console.log(`[INFO] No commitHash provided, will attempt to fetch head commit for branch: ${branch || "main"}`);
  }
  if (!userId || userId === "undefined" || !repo || repo === "undefined" || !branch || branch === "undefined") {
    console.error("[ERROR] userId is undefined or missing!");
    return res.status(400).json({ error: "Valid userId, repo, and branch are required" });
  }
         
  try { 
    let finalCommitHash;

  if (!commitHash || commitHash === "undefined") {
    console.log(`[INFO] No commitHash provided, fetching head for branch: ${branch}`);
    finalCommitHash = await getHeadCommit(userId, repo, branch);
  } else {
    console.log(`[INFO] Using provided commitHash: ${commitHash}`);
    finalCommitHash = commitHash;
  }

   
    const treeHash = await getTreeHash(userId, repo, finalCommitHash);
    const tree = await readTree(userId, repo, treeHash);

    console.log(`[DEBUG] Successfully built tree for repo: ${repo}`);
    res.json({
      commit: finalCommitHash,
      tree,
    });

  } catch (err) {
    console.error(`[ERROR CATCH] in getRepoTree:`, err.name, err.message);
    
    // Safely handle completely empty/new repositories
    if (err.name === "NoSuchKey" || err.Code === "NoSuchKey" || err.message === "No commits yet") {
      console.log(`[INFO] Empty repository detected (no commits/keys found). Returning empty root tree.`);
      return res.json({
        commit: null,
        tree: {
          name: "root",
          type: "folder",
          children: [],
        },
      });
    }

    res.status(500).json({ error: err.message });
  }
};

const getFile = async (req, res) => {
  const { userId, repo } = req.params;
  const { hash } = req.query;
  console.log(`\n--- [API HIT] /repo/getfile ---`);
  console.log(`[DEBUG] Request -> userId: ${userId}, repo: ${repo}, hash: ${hash}`);

  try {
    const content = await readBlob(userId, repo, hash);
    console.log(`[DEBUG] Successfully fetched file content. Length: ${content.length} chars`);
    res.send(content);
  } catch (err) {
    console.error(`[ERROR CATCH] in getFile:`, err.message);
    res.status(500).send("Error reading file from S3");
  }
}; 

// Helper function to convert stream to string for metadata
const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

async function getRepoMetadata(userId, repo) {
  if (!userId || !repo) throw new Error("userId and repo required");

  const key = `users/${userId}/repos/${repo}/metadata.json`;
  console.log(`[S3 DEBUG] Fetching metadata from key: ${key}`);

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const response = await s3.send(command);
  const body = await streamToString(response.Body);
  return JSON.parse(body);
}

const getRepoMeta = async (req, res) => {
  const { userId, repo } = req.query;
  console.log(`\n--- [API HIT] /repo/getmeta ---`);
  console.log(`[DEBUG] Fetching metadata for -> userId: ${userId}, repo: ${repo}`);

  try {
    const metadata = await getRepoMetadata(userId, repo);
    res.json(metadata);
  } catch (err) {
    console.error("[ERROR CATCH] Metadata fetch error:", err.message);

    if (err.name === "NoSuchKey") {
      return res.status(404).json({ error: "Repository metadata not found" });
    }

    res.status(500).json({ error: "Failed to fetch repository metadata" });
  }
};

export { readBlob, readObject, readTree, getFile, getRepoTree, getRepoMeta };