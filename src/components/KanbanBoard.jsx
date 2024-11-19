import React, { useMemo } from 'react'
import TicketCard from './TicketCard'

const priorityMap = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
}

const statusIcons = {
  'Todo': '/assets/todo.svg',
  'In progress': '/assets/in-progress.svg',
  'Backlog': '/assets/backlog.svg',
  'Done': '/assets/done.svg',
  'Canceled': '/assets/cancelled.svg'
}

const priorityIcons = {
  'Urgent': '/assets/urgent-priority-colored.svg',
  'High': '/assets/img-high-priority.svg',
  'Medium': '/assets/img-medium-priority.svg',
  'Low': '/assets/img-low-priority.svg',
  'No priority': '/assets/no-priority.svg'
}

export default function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupedAndSortedTickets = useMemo(() => {
    let groups = {}

    if (grouping === 'status') {
      groups = {'Backlog': [], 'Todo': [], 'In progress': [], 'Done': [], 'Canceled': [] }
    } else if (grouping === 'user') {
      users.forEach(user => {
        groups[user.name] = []
      })
    } else if (grouping === 'priority') {
      groups = { 'No priority': [], 'Urgent': [], 'High': [], 'Medium': [], 'Low': [] }
    }

    tickets.forEach(ticket => {
      let key
      if (grouping === 'status') {
        key = ticket.status
      } else if (grouping === 'user') {
        key = users.find(user => user.id === ticket.userId).name
      } else if (grouping === 'priority') {
        key = priorityMap[ticket.priority]
      }
      if (groups[key]) {
        groups[key].push(ticket)
      }
    })

    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority
        } else {
          return a.title.localeCompare(b.title)
        }
      })
    })

    return groups
  }, [tickets, users, grouping, sorting])

  return (
    <div className="kanban-board">
      {Object.entries(groupedAndSortedTickets).map(([group, groupTickets]) => (
        <div key={group} className="board-column">
          <div className="column-header">
            <h2 className="column-title">
              {grouping === 'status' && (
                <span className="column-icon">
                  <img src={statusIcons[group]} alt={group} />
                </span>
              )}

              {grouping === 'priority' && (
                <span className="column-icon">
                  <img src={priorityIcons[group]} alt={group} />
                </span>
              )}
              {grouping === 'user' && (
                <span className="column-icon">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${group}`}
                    alt={group}
                  />
                </span>
              )}
              {group} <span className="column-count">{groupTickets.length}</span>
            </h2>
            <div className="column-actions">
              <button>
                <img src="/assets/add.svg" alt="Add" />
              </button>
              <button>
                <img src="/assets/3-dot-menu.svg" alt="Menu" />
              </button>
            </div>
          </div>
          {groupTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              user={users.find(user => user.id === ticket.userId)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}