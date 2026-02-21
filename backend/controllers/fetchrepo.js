
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws-config.js";

const BUCKET = "mohith-github01";

 async function readObject(key) {
  const cmd = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  const res = await s3.send(cmd);
  return Buffer.from(await res.Body.transformToByteArray());
}



async function readTree(userId, repo, hash) {

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
  const key = `users/${userId}/repos/${repo}/obj/${hash}`;

  const raw = await readObject(key);

  const nullIndex = raw.indexOf(0);
  const content = raw.slice(nullIndex + 1);

  return content.toString("utf-8");
}

async function getHeadCommit(userId, repo, branch = "main") {
  const key =
    `users/${userId}/repos/${repo}/ref/branches/${branch}/head`;

  const raw = await readObject(key);

  const text = raw.toString().trim();

  if (!text) throw new Error("No commits yet");

  // format: "<hash>\t<message>"
  return text.split("\t")[0];
}

async function getTreeHash(userId, repo, commitHash) {

  const key =
    `users/${userId}/repos/${repo}/obj/${commitHash}`;

  const raw = await readObject(key);

  const nullIndex = raw.indexOf(0);
  const content = raw.slice(nullIndex + 1).toString();

  const firstLine = content.split("\n")[0];

  // "tree abc123"
  return firstLine.split(" ")[1];
}

const getRepoTree = async (req, res) => {
  const { userId, repo } = req.query;
  console.log("user",userId,"repo",repo,"called func fetchrepotree")
  try {
   
    const commitHash = await getHeadCommit(userId, repo);


    const treeHash = await getTreeHash(
      userId,
      repo,
      commitHash
    );

  
    const tree = await readTree(userId, repo, treeHash);

    res.json({
      commit: commitHash,
      tree,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getFile = async (req, res) => {
  const { userId, repo } = req.params;
  const { hash } = req.query;

  const content = await readBlob(userId, repo, hash);
  res.send(content);
}; 
async function getRepoMetadata(userId, repo) {
  if (!userId || !repo)
    throw new Error("userId and repo required");

  const key =
    `users/${userId}/repos/${repo}/metadata.json`;

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

  console.log("Fetching metadata:", userId, repo);

  try {
    const metadata = await getRepoMetadata(
      userId,
      repo
    );

    res.json(metadata);
  } catch (err) {
    console.error("Metadata fetch error:", err);

    if (err.name === "NoSuchKey") {
      return res.status(404).json({
        error: "Repository metadata not found",
      });
    }

    res.status(500).json({
      error: "Failed to fetch repository metadata",
    });
  }
};

export {readBlob,readObject,readTree,getFile,getRepoTree,getRepoMeta}