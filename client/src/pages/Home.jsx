import React from 'react'
export default function Home(){
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div className="card">
        <h1 style={{fontSize:28, margin:0}}>Welcome to Sentiment Safari 🐯</h1>
        <p style={{color:'#475569'}}>Story-driven lessons, mini-games, and a live playground to learn how computers read feelings.</p>
        <div style={{marginTop:12}}>
          <a className="btn" href="/story">Start the Story</a>
        </div>
      </div>
      <div className="card">
        <h3 style={{marginTop:0}}>What you'll do</h3>
        <ul>
          <li>Follow Tia and Niv in multiple chapters</li>
          <li>Try the Playground to analyze sentences</li>
          <li>Play games and save scores to the leaderboard</li>
        </ul>
      </div>
    </div>
  )
}
