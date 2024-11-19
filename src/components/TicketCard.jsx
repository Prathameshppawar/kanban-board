import React from 'react'

const priorityIcons = {
  4: '/assets/urgent-priority-colored.svg',
  3: '/assets/img-high-priority.svg',
  2: '/assets/img-medium-priority.svg',
  1: '/assets/img-low-priority.svg',
  0: '/assets/no-priority.svg'
}

const statusIcons = {
    'In progress': './assets/in-progress.svg',
    'Todo': './assets/todo.svg',
    'Backlog': './assets/backlog.svg',
    'Done': './assets/done.svg',
    'Canceled': './assets/cancelled.svg'
}
export default function TicketCard({ ticket, user }) {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
          <span className={`availability-indicator ${user.available ? 'available' : ''}`}></span>
        </div>  
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-tags">
      <span className="priority-icon">
          <img src={statusIcons[ticket.status]} alt="Status" />
        </span>
        <span className="priority-icon">
          <img src={priorityIcons[ticket.priority]} alt="Priority" />
        </span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            <span className="tag-dot"></span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}