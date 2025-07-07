# mini-message-board

A mini message board is built using HTML, CSS, and JavaScript.

A Node.js + Express server renders views with EJS and handles message storage using PostgreSQL.

> 🔗 A preview is available [here](https://mini-message-board-zq1g.onrender.com/)

## Features

- Post messages with an optional display name
- Input validation using [`express-validator`](https://express-validator.github.io/)
- Automatic moderation via [Azure AI Content Safety](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/) (free tier)
- Persistent messages storage using a PostgreSQL database
- Timestamps are formatted client-side based on user timezone
- Real-time updates using WebSocket: all connected clients receive message list updates instantly
- WebSocket connection is suspended when the tab is inactive to conserve resources
- Server broadcasts are event-driven and debounced — only triggered on actual DB changes

## Tech Stack

- **Node.js** – JavaScript runtime for the server
- **Express** – Web framework for routing and server logic
- **EJS** – Embedded JavaScript templating for HTML rendering
- **PostgreSQL** – Relational database for persistent message storage
- **pg** – Node.js client for PostgreSQL
- **express-validator** – Input validation middleware
- **express-async-handler** – Simplifies async route handlers
- **@azure-rest/ai-content-safety** – Connects to Azure AI Content Safety API for content moderation
- **ws** – WebSocket implementation for real-time message broadcasting
- **dotenv** – Loads environment variables from `.env` files
- **Vanilla JavaScript / HTML / CSS** – Frontend logic and layout

## Setup

Follow these steps to run the app locally:

1. **Clone the repository**
   ```bash
   git clone git@github.com:frarosset/mini-message-board.git
   cd mini-message-board
   ```
2. **Install dependencies**
   ```bash
    npm install
   ```
3. **Initialize the database**
   
   Initialize a PostgreSQL database and obtain its connection URI
   ```
   postgresql://your_user:your_password@host:port/your_db
   ```
5. **Configure environment variables**
   
   Create a `.env` file in the root directory (use `.env.example` as a reference)
7. **Start the server**
   ```bash
    node app.js
   ```
