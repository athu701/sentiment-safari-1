import React, { useState } from 'react'
import { postScore } from '../lib/api'

const QUIZ = [
  { q: 'Which sentence is MOST positive?', choices: ['It is okay.', 'I absolutely love it!', 'It exists.'], a:1 },
  { q: 'Which word is negative?', choices: ['wonderful','terrible','amazing'], a:1 },
  { q: 'Sentiment analysis finds…', choices: ['the mood of text','spelling errors','number of commas'], a:0 }
];

export default function Quiz(){
  const [sel, setSel] = useState({})
  const [done, setDone] = useState(false)
  const [name, setName] = useState('')

  const score = Object.entries(sel).reduce((s,[i,v])=> s + (QUIZ[i].a===v? 10:0), 0)

  async function submit(){
    setDone(true)
  }

  async function save(){
    if(!name.trim()) return alert('Enter name to save')
    try{
      await postScore({ name, points: score, game: 'quiz' })
      alert('Saved to leaderboard!')
    }catch(e){
      alert('Save failed.')
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Quick Quiz</h2>
        <p>Each correct answer = 10 points.</p>
      </div>

      {QUIZ.map((it, idx)=> (
        <div className="card" key={idx} style={{marginTop:12}}>
          <div style={{fontWeight:700}}>Q{idx+1}. {it.q}</div>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            {it.choices.map((c,i)=> {
              const isSelected = sel[idx]===i
              const isCorrect = done && it.a===i
              const wrongSelected = done && isSelected && it.a!==i
              const cls = isCorrect ? 'quiz-correct' : wrongSelected ? 'quiz-wrong' : ''
              return (
                <label key={i} style={{padding:8, borderRadius:10, border:'1px solid #e6e9ee'}} className={cls}>
                  <input type="radio" name={`q${idx}`} onChange={()=> setSel(s=>({...s, [idx]: i}))} disabled={done} /> {c}
                </label>
              )
            })}
          </div>
          {done && (
            <div style={{marginTop:8}}>
              {sel[idx]===it.a ? <span style={{color:'#059669'}}>Correct ✅</span> : <span style={{color:'#dc2626'}}>Wrong ❌ — Correct: {it.choices[it.a]}</span>}
            </div>
          )}
        </div>
      ))}

      <div style={{marginTop:12}} className="card">
        {!done ? <button className="btn" onClick={submit}>Submit</button> : (
          <>
            <div style={{fontWeight:800}}>Your score: {score} / {QUIZ.length*10}</div>
            <div style={{marginTop:8}}>
              <input placeholder="Name for leaderboard" value={name} onChange={e=>setName(e.target.value)} style={{padding:8, borderRadius:8, border:'1px solid #e6e9ee'}} />
              <button className="btn" onClick={save} style={{marginLeft:8}}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
