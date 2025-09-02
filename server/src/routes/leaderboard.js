import { Router } from 'express';
import { Score } from '../models/Score.js';
const router = Router();

router.get('/leaderboard', async (req, res) => {
  const top = await Score.find().sort({ points: -1, createdAt: 1 }).limit(50).lean();
  res.json(top);
});

router.post('/leaderboard', async (req, res) => {
  try{
    const { name, points, game } = req.body || {};
    if(!name || points==null || !game) return res.status(400).json({ error: 'name, points, game required' });
    // upsert highest per name+game
    const existing = await Score.findOne({ name, game });
    if(existing){
      if(points > existing.points){
        existing.points = points;
        await existing.save();
        return res.json(existing);
      }
      return res.json(existing);
    }
    const saved = await Score.create({ name, points, game });
    res.json(saved);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

export default router;
