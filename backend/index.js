import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoosePkg from 'mongoose'; // Renamed to mongoosePkg
const { connect, connection } = mongoosePkg;

import { createServer } from "http";
import { Server } from "socket.io";
import mainRouter from "./routes/main.router.js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import bodyParserPkg from 'body-parser'; // Renamed to bodyParserPkg
const { json: _json } = bodyParserPkg;
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pushRepo } from "./controllers/push.js";
import { pullRepo } from "./controllers/pull.js";
import { revertRepo } from "./controllers/revert.js";

config();

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(_json());
  app.use(json());

  const mongoURI = process.env.MONGODB_URI;

  connect(mongoURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Unable to connect : ", err));

  app.use(cors({ origin: "*" }));

  app.use("/", mainRouter);

  let user = "test";
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    });
  });

  const db = connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
   
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}