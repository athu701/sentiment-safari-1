import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';

const router = Router();
const limiter = rateLimit({ windowMs: 30 * 1000, max: 12 });

router.post('/chat', limiter, async (req, res) => {
  try {
    const { question } = req.body || {};
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question required' });
    }

    console.log("in gpt.jsx", process.env.OPENAI_API_KEY);
    console.log("Raw value:", JSON.stringify(process.env.OPENAI_API_KEY));
    console.log("Length:", process.env.OPENAI_API_KEY?.length);

    if (!process.env.OPENAI_API_KEY) {
      // fallback kid-friendly response when key not set
      return res.json({
        ok: true,
        answer: "Hi! I can help explain. (You haven't added an OpenAI key yet — add OPENAI_API_KEY in server .env to enable live AI answers.)\n\nExample: A sentiment analyzer gives scores to words. Positive words add points, negative words remove points. Try: 'I love cake but hate rain' and see how it adds up!"
      });
    }

    // ✅ IMPORTANT: add baseURL for AIMLAPI
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || "https://api.aimlapi.com/v1"
    });

    const systemPrompt = "You are Tia the Tiger's Helper: explain things to 6th graders in simple words, give one short example, and one emoji.";

    const resp = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      max_tokens: 250
    });

    const text = resp?.choices?.[0]?.message?.content || 'Sorry, I could not answer.';
    res.json({ ok: true, answer: text });
  } catch (e) {
    console.error('Chat error', e.response?.data || e.message || e);
    res.status(500).json({ error: 'Chat failed' });
  }
});

export default router;
