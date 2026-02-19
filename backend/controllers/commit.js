import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
async function commitRepo(argv){
    const message=argv.message;
    const repoPath = path.resolve(process.cwd(), "HamaraGit");
    const stagingPath = path.join(repoPath, "staging");
    const commitsPath = path.join(repoPath, "commits"); 
    try{
        const commitID=uuidv4();
        const commitDir= path.join(commitsPath,commitID);
        await fs.mkdir(commitDir,{recursive:true});
    const files=await fs.readdir(stagingPath);    
    for(const file of files){
        await fs.copyFile(path.join(stagingPath,file),
        path.join(commitDir,file));
    }
    await fs.writeFile(path.join(commitDir,"commit.txt"),JSON.stringify({message,date:new Date().toISOString()}));
    console.log(`Commit ${commitID} created successfully with message: "${message}"`);
    }   
catch(err){
            console.log("Error committing files :", err.message);
        }

}
export {commitRepo};