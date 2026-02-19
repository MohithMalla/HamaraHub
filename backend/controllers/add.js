import fs from 'fs/promises';
import path from 'path';

// Change the argument name to 'argv' to be clear it's an object
async function addRepo(argv) {
    console.log(argv);
    // 1. Define the main Repo path
    const repoPath = path.resolve(process.cwd(), "HamaraGit");
    const stagingPath = path.join(repoPath, "staging"); 

    try {
        // 2. Extract the filepath from the argv object
        // IMPORTANT: Check your index.js! 
        // If you wrote .command('add <filepath>'), use argv.filepath
        // If you wrote .command('add <file>'), use argv.file
        const filePath = argv.filepath || argv.file || argv._[1]; 

        if (!filePath) {
            throw new Error("File path argument is missing. Check your index.js command definition.");
        }

        await fs.mkdir(stagingPath, { recursive: true });
        
        const fileName = path.basename(filePath);
        
        // 3. Copy using the extracted string path
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        
        console.log(`File ${fileName} is successfully added to staging at ${stagingPath}`);
    } catch (err) {
        console.log("Error adding file:", err.message);
    }
}

export { addRepo };