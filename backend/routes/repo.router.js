import { Router } from "express";
import { 
  createRepository, 
  getAllRepositories, 
  fetchRepositoryById, 
  fetchRepositoryByName, 
  fetchRepositoriesForCurrentUser, 
  updateRepositoryById, 
  deleteRepositoryById, 
  toggleVisibilityById,
  serveRepository 
} from "../controllers/repoController.js";
import {readBlob,readObject,readTree,getFile,getRepoTree,getRepoMeta} from "../controllers/fetchrepo.js";
const repoRouter = Router();

repoRouter.get('/repo/getrepo',(req,res,next)=>{
  console.log("ROUTE HIT");
  next();
},getRepoTree) 
repoRouter.get('/repo/getfile/:userId/:repo',getFile) 
repoRouter.get('/repo/getmeta',getRepoMeta)
repoRouter.post("/repo/create", createRepository);
repoRouter.get("/repo/all", getAllRepositories);
repoRouter.get("/repo/:id", fetchRepositoryById);
repoRouter.get("/repo/name/:name", fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", fetchRepositoriesForCurrentUser);
repoRouter.post("/repo/update/:id", updateRepositoryById);
repoRouter.delete("/repo/delete/:id", deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", toggleVisibilityById);

repoRouter.get("/repo/view/:id", serveRepository);

export {repoRouter};