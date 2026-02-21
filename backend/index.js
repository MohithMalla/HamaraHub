// import express from "express";  
// import cors from "cors";
// import bodyParser from "body-parser"; 
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import http from "http";
// dotenv.config();


// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";

// // Import commands (NOTE: You must add .js at the end!)
// import { initRepo } from "./controllers/init.js";
// import { addRepo } from "./controllers/add.js";
// import { commitRepo } from "./controllers/commit.js";
// import { pullRepo } from "./controllers/pull.js";
// import { pushRepo } from "./controllers/push.js";
// import { revertRepo } from "./controllers/revert.js";

// yargs(hideBin(process.argv))
// .command("start","starts a new server",{},startServer)
//   .command("init", "Initialise a new repository", {}, initRepo)
//   .command(
//     "add <file>",
//     "Add a file to the repository",
//     (yargs) => {
//       yargs.positional("file", {
//         describe: "File to be added to the staging area",
//         type: "string",
//       });
//     },
//     addRepo
//   )
//   .command(
//     "commit <message>",
//     "Commit changes to the repository",
//     (yargs) => {
//       yargs.positional("message", {
//         describe: "Commit message describing the changes",
//         type: "string",
//       });
//     },
//     commitRepo
//   )
//   .command("push", "Push commits to S3", {}, pushRepo)
//   .command("pull", "Pull commits from S3", {}, pullRepo)
//   .command(
//     "revert <commitID>",
//     "Revert changes to a specific commit",
//     (yargs) => {
//       yargs.positional("commitID", {
//         describe: "The commit ID to revert to",
//         type: "string",
//       });
//     },
//     revertRepo
//   )
//   .demandCommand(1, "You need at least one command")
//   .parse();

// function startServer() {
//   console.log("Server started successfully!");
//   app.use(bodyParser.json());
//   app.use(express.json());  
//   app.use(cors());  
//   const mongoURI = process.env.MONGODB_URI;
//   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));
// }



import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
// import mongoosePkg from 'mongoose'; 
// const { connect, connection } = mongoosePkg;
import connectDB from "./config/db.js";
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

  // connect(mongoURI)
  //   .then(() => console.log("MongoDB connected!"))
  //   .catch((err) => console.error("Unable to connect : ", err));

  app.use(cors({ origin: "*" }));

  app.use( mainRouter); 


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

  // const db = connection;

  // db.once("open", async () => {
  //   console.log("CRUD operations called");

  // });
  connectDB();
  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}