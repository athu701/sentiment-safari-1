import { Router } from 'express';
import Sentiment from 'sentiment';
const sentiment = new Sentiment();
const router = Router();

router.post('/analyze', (req, res) => {
  try {
    const { text } = req.body || {};
    if(!text || !text.trim()) return res.status(400).json({ error: 'Text is required' });
    const result = sentiment.analyze(text);
    res.json({ ok:true, result });
  } catch(e){
    console.error(e);
    res.status(500).json({ error: 'Failed to analyze' });
  }
});

export default router;
