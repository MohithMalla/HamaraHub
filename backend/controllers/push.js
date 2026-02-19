import fs from 'fs/promises';
import path from 'path';
import { s3, S3_BUCKET } from '../config/aws-config.js';

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), "HamaraGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        // FIX 1: Read directory into 'commitDirs' (plural)
        const commitDirs = await fs.readdir(commitsPath);
        
        // FIX 2: Loop through the 'commitDirs' array
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);
            
            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                };

                // FIX 3: Use .promise() so 'await' actually waits for the upload
                await s3.upload(params).promise();
                
                console.log(`Successfully uploaded ${file} to S3`);
            }
        }
        console.log("All commits pushed to S3 successfully.");
    } catch (err) {
        console.log("Error pushing to S3:", err.message);
    }
}

export { pushRepo };