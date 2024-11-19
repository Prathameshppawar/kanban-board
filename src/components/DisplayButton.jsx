import React, { useState } from 'react'

export default function DisplayButton({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  return (
    <div className="display-button">
      <button
        className={`display-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
      >
        <img src="/assets/display.svg" alt="Display" />
        Display
        <img src="/assets/down.svg" alt="Dropdown" />
      </button>
      <div className={`display-options ${isOpen ? 'active' : ''}`}>
        <div className="option">
          <label htmlFor="grouping">Grouping</label>
          <select
            id="grouping"
            value={grouping}
            onChange={(e) => onGroupingChange(e.target.value)}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="option">
          <label htmlFor="sorting">Ordering</label>
          <select
            id="sorting"
            value={sorting}
            onChange={(e) => onSortingChange(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  )
}