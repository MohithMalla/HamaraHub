# HamaraHub

A Community Deployment Platform inspired by GitHub + Vercel.

HamaraHub is a full-stack deployment platform that allows developers to upload, version, host, and share frontend applications through unique deployment URLs. The platform combines lightweight version control capabilities with modern cloud deployment workflows.

---

# 🚀 Features

* Custom CLI for deployment workflows
* Snapshot-based lightweight version control
* React application deployment support
* Unique live deployment URLs
* Cloud storage using AWS S3
* Real-time deployment updates using Socket.io
* Secure JWT authentication
* Deployment metadata management
* Static asset hosting
* Scalable backend architecture

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Socket.io

## Cloud & Storage

* AWS S3

## Authentication & Security

* JWT
* Bcrypt

## CLI & Utilities

* Yargs

---

# 📌 Problem Statement

Deploying frontend applications often requires multiple configuration steps, hosting setup, cloud integration, and deployment management.

HamaraHub simplifies this process by providing:

* Easy deployment workflows
* Centralized hosting
* Versioned snapshots
* Instant deployment URLs
* Scalable cloud storage

The platform enables developers to deploy applications quickly without manually configuring infrastructure.

---

# 🧠 How HamaraHub Works

## Step 1: Build the React Application

The developer creates a production build:

```bash
npm run build
```

This converts the React source code into optimized static files:

* HTML
* CSS
* JavaScript bundles
* Static assets

---

## Step 2: Upload Using CLI

The custom CLI uploads the generated build folder to the HamaraHub backend.

Example:

```bash
hamarahub deploy
```

The CLI:

* Reads project files
* Creates deployment snapshots
* Uploads files asynchronously
* Tracks deployment status

---

## Step 3: Backend Processing

The Express.js backend:

* Receives deployment files
* Generates deployment IDs
* Stores metadata in MongoDB
* Uploads assets to AWS S3

---

## Step 4: Asset Hosting

Static files are hosted and served through unique deployment URLs.

Example:

```text
https://hamarahub.app/deploy/abc123
```

Users can instantly access the live application through the generated URL.

---

# 🏗 Architecture Flow

```text
React App
   ↓
Production Build
   ↓
Custom CLI Upload
   ↓
Express Backend
   ↓
AWS S3 Storage
   ↓
Deployment URL Generation
   ↓
Live Hosted Application
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/yourusername/hamarahub.git
```

```bash
cd hamarahub
```

---

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Install Backend Dependencies

```bash
cd server
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=your_region
```

---

# ▶️ Running the Project

## Start Backend

```bash
npm run server
```

## Start Frontend

```bash
npm start
```

---

# 📦 Deployment Workflow

## Build Application

```bash
npm run build
```

## Deploy Using CLI

```bash
hamarahub deploy
```

## Receive Live URL

```text
Deployment Successful!
https://hamarahub.app/deploy/xyz789
```

---

# 🔒 Authentication

HamaraHub uses:

* JWT for stateless authentication
* Bcrypt for password hashing
* Protected deployment APIs
* Secure session handling

---

# 📡 Real-Time Features

Socket.io is used for:

* Live deployment status updates
* Real-time event communication
* Deployment progress tracking
* Instant client notifications

---

# 📁 Database Design

MongoDB stores:

* User data
* Deployment metadata
* Project details
* Deployment history
* Snapshot information

---

# ☁️ AWS S3 Integration

AWS S3 is used for:

* Static file storage
* Deployment asset management
* Scalable cloud hosting
* Fast file retrieval

---

# 📚 Key Learnings

Through HamaraHub, I learned:

* Full-stack system architecture
* Cloud storage integration
* Deployment pipelines
* File handling and uploads
* Authentication systems
* Real-time communication
* Scalable backend development
* Static site hosting workflows

---

# 🔮 Future Improvements

* CI/CD pipeline integration
* Docker support
* Kubernetes deployment
* GitHub repository integration
* Custom domains
* Analytics dashboard
* Rollback deployments
* Team collaboration features

---

# 🎯 Inspiration

HamaraHub is inspired by:

* GitHub (version control concepts)
* Vercel (deployment workflow)
* Netlify (frontend hosting)

---

# 👨‍💻 Author

Developed by Mohith Malla.

---

# 📄 License

This project is licensed under the MIT License.
