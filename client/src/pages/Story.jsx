import React, { useState } from 'react'
import { fetchSentences } from '../lib/api'

const chapters = [
  { id:1, title: 'Chapter 1: Jungle Letters', text: `Tia the Tiger and Niv the Nightingale found a mailbox with notes. Some notes were happy, some sad, some plain. They wondered if a computer can help.` },
  { id:2, title: 'Chapter 2: The Mixed Note', text: `One day they found a note: 'I love cake but hate rain'. Tia learned that words like 'love' add points and 'hate' subtract points. Small words like 'but' can change meaning.` },
  { id:3, title: 'Chapter 3: The Robot Reader', text: `They met a little robot that adds numbers for feelings. The robot shows which words are positive and which are negative. You can ask the robot for more help.` }
];

export default function Story(){
  const [i, setI] = useState(0);
  const [extra, setExtra] = useState(null);

  async function more(){
    // call AI via ChatWidget or API directly is available through ChatWidget; here we show a hint
    setExtra('More knowledge: positive words include "love", "great"; negative words include "hate", "bad". Try typing your own sentence in Playground!')
  }

  return (
    <div>
      <div className="card">
        <h2>{chapters[i].title}</h2>
        <p>{chapters[i].text}</p>
        <div style={{display:'flex', gap:8, marginTop:10}}>
          <button className="btn" onClick={()=> setI(Math.max(0, i-1))}>Prev</button>
          <button className="btn" onClick={()=> setI(Math.min(chapters.length-1, i+1))}>Next</button>
          <button className="btn-ghost" onClick={more}>More Knowledge</button>
        </div>
        {extra && <div style={{marginTop:10}} className="card">{extra}</div>}
      </div>
      <div style={{marginTop:16}} className="card">
        <h3>Chapter Quiz</h3>
        <p>After each chapter you can try a short quiz in the Quiz page.</p>
      </div>
    </div>
  )
}
