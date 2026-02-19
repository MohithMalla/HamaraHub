import fs from 'fs/promises';
import path from 'path';

async function initRepo() {
    // 1. Define the main Repo path first
    const repoPath = path.resolve(process.cwd(), "HamaraGit");
    
    // 2. Define commits path RELATIVE to the repoPath, not the CWD
    const commitsPath = path.join(repoPath, "commits"); 

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath, "config.json"), 
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );
        
        console.log("Repository initialized successfully at", repoPath);
    } catch (err) {
        console.log("error initializing repository:", err);
    }
}

export { initRepo };