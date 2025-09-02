import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db.js';
import analyze from './routes/analyze.js';
import leaderboard from './routes/leaderboard.js';
import sentences from './routes/sentences.js';
import chat from './routes/chatgpt.js';

dotenv.config();
console.log("OPENAI_API_KEY loaded?", process.env.OPENAI_API_KEY ? "Yes ✅" : "No ❌");
console.log("print",process.env.OPENAI_API_KEY);

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('Sentiment Safari API 🐯'));

app.use('/api', analyze);
app.use('/api', leaderboard);
app.use('/api', sentences);
app.use('/api', chat);

connectDB().then(()=> {
  app.listen(PORT, ()=> console.log(`🚀 Server running on :${PORT}`));
}).catch(err => {
  console.error('DB connection failed', err);
  app.listen(PORT, ()=> console.log(`🚀 Server running without DB on :${PORT}`));
});

if(!process.env.OPENAI_API_KEY){
  console.log('⚠️ OPENAI_API_KEY not set — Chat feature will return a fallback response until you set it.');
}
