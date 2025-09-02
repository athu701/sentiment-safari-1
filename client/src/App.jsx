import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Story from './pages/Story'
import Playground from './pages/Playground'
import Quiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import ChatWidget from './components/ChatWidget'

export default function App(){
  return (
    <>
      <header className="header">
        <div style={{fontWeight:900}}>🐯 Sentiment Safari</div>
        <nav>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/story">Story</Link>
          <Link className="nav-link" to="/playground">Playground</Link>
          <Link className="nav-link" to="/quiz">Quiz</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
      <footer className="footer">Built for Vizuara Assignment — Sentiment Safari</footer>
      <ChatWidget />
    </>
  )
}
