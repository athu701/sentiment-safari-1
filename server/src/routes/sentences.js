import { Router } from 'express';
import { SAMPLE } from '../utils/sampleSentences.js';
const router = Router();
router.get('/sentences', (req, res) => res.json(SAMPLE));
export default router;
