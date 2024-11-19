import React, { useState, useEffect } from 'react'
import KanbanBoard from './components/KanbanBoard'
import DisplayButton from './components/DisplayButton'
import './styles/index.css'

export default function App() {
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
  const [grouping, setGrouping] = useState(() => {
    const saved = localStorage.getItem('grouping')
    return saved || 'status'
  })
  const [sorting, setSorting] = useState(() => {
    const saved = localStorage.getItem('sorting')
    return saved || 'priority'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
        const data = await response.json()
        setTickets(data.tickets)
        setUsers(data.users)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    localStorage.setItem('grouping', grouping)
    localStorage.setItem('sorting', sorting)
  }, [grouping, sorting])

  return (
    <div className="app">
      <nav className="navbar">
        <DisplayButton
          grouping={grouping}
          sorting={sorting}
          onGroupingChange={setGrouping}
          onSortingChange={setSorting}
        />
      </nav>
      <main className="main-content">
        <KanbanBoard
          tickets={tickets}
          users={users}
          grouping={grouping}
          sorting={sorting}
        />
      </main>
    </div>
  )
}