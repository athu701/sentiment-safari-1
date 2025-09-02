import React, { useState } from 'react'
import { askAI } from '../lib/api'
export default function ChatWidget(){
  const [q, setQ] = useState('')
  const [ans, setAns] = useState(null)
  const [loading, setLoading] = useState(false)

  async function ask(){
    if(!q.trim()) return
    setLoading(true)
    try{
      const res = await askAI(q)
      setAns(res.answer || res)
    }catch(e){
      setAns('Sorry, the helper is unavailable.')
    }finally{ setLoading(false) }
  }

  return (
    <div style={{position:'fixed', right:20, bottom:20, width:320, zIndex:200}}>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <div style={{fontWeight:800}}>Ask Tia 🐯</div>
        </div>
        <textarea rows={3} value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about chapters or sentiment..." />
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <button className="btn" onClick={ask} disabled={loading}>{loading ? 'Asking...' : 'Ask'}</button>
          <button className="btn-ghost" onClick={()=>{ setQ(''); setAns(null); }}>Clear</button>
        </div>
        {ans && <div style={{marginTop:10, padding:8, background:'#f8fafc', borderRadius:8}}>{ans}</div>}
      </div>
    </div>
  )
}
