import React, { useEffect, useState } from 'react'
import { getLeaderboard } from '../lib/api'

export default function Leaderboard(){
  const [rows, setRows] = useState([])
  useEffect(()=>{ getLeaderboard().then(setRows).catch(()=>setRows([])) },[])
  return (
    <div className="card">
      <h2>Top Explorers 🏆</h2>
      <table style={{width:'100%', marginTop:12}}>
        <thead style={{textAlign:'left', color:'#64748b'}}><tr><th>#</th><th>Name</th><th>Game</th><th>Points</th></tr></thead>
        <tbody>
          {rows.map((r,i)=> (
            <tr key={r._id} style={{background:i%2? '#fff':'#fffbeb'}}>
              <td style={{padding:8}}>{i+1}</td>
              <td style={{padding:8}}>{r.name}</td>
              <td style={{padding:8}}>{r.game}</td>
              <td style={{padding:8, fontWeight:700}}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
