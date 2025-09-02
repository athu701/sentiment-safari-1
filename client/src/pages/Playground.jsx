import React, { useState } from 'react'
import { analyzeText } from '../lib/api'

export default function Playground(){
  const [text, setText] = useState('I love ice cream but hate rain')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function run(){
    setLoading(true)
    try{
      const r = await analyzeText(text)
      setResult(r)
    }catch(e){
      alert('Analyze failed. Is the server running?')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="card">
        <h2>Playground</h2>
        <textarea rows={3} value={text} onChange={e=>setText(e.target.value)} />
        <div style={{marginTop:8}}>
          <button className="btn" onClick={run} disabled={loading}>{loading? 'Analyzing...' : 'Analyze'}</button>
        </div>
      </div>

      {result && (
        <div style={{marginTop:12}} className="card">
          <h3>Result</h3>
          <div><strong>Score:</strong> {result.score} &nbsp; <strong>Comparative:</strong> {result.comparative}</div>
          <div style={{marginTop:8}}>
            {result.tokens.map((t,i)=> {
              const isPos = result.positive.includes(t)
              const isNeg = result.negative.includes(t)
              return <span key={i} className="badge" style={{background:isPos?'#dcfce7':isNeg?'#fee2e2':'#f1f5f9'}}>{t}</span>
            })}
          </div>
        </div>
      )}
    </div>
  )
}
