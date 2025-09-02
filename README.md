# Sentiment Safari - MERN App (zipped starter)

This zip contains a complete starter MERN app tailored for the Vizuara assignment: story-driven learning, playground, quiz, leaderboard, and ChatGPT-powered help.

## How to use

1. Unzip and open two terminals.

### Server
```
cd server
npm install
# create a .env file from .env.example and update values later
cp .env.example .env
# optionally edit OPENAI_API_KEY in .env
npm run dev
```

### Client
```
cd client
npm install
npm run dev
# open http://localhost:5173
```

## Notes
- Add your MongoDB connection string to `server/.env` as `MONGO_URI`.
- Add `OPENAI_API_KEY` in `server/.env` to enable live AI answers. If not set, the server returns a helpful fallback message.
- Frontend will call the server at `http://localhost:8080` by default. To change, set `VITE_API_URL` env when building.

Good luck — unzip, run, and let me know if you want me to push this to a GitHub repo for you.
