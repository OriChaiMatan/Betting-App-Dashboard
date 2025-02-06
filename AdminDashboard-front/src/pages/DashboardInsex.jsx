import React, { useState, useEffect } from 'react'
import { linkService } from '../services/link.service'

export function DashboardInsex() {
  const [links, setLinks] = useState([])

  useEffect(() => {
    loadLinks()
  }, [])

  async function loadLinks() {
    try {
      const links = await linkService.query()
      setLinks(links)
    } catch (err) {
      console.log('Error in loadEmails', err)
    }
  }

  if (!links) return <div>Loading...</div>
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {links ? (
          links.map((link) => (
            <li key={link._id}>
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                <img src={link.imgUrl} alt={link.title} width="50" />
                {link.title}
              </a>
            </li>
          ))
        ) : (
          <p>Loading links...</p>
        )}
      </ul>
    </div>

  )
}
