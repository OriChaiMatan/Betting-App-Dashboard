import React, { useState, useEffect } from 'react'
import { linkService } from '../services/link.service'
import { LinksList } from '../cmps/LinksList'

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

  async function onRemoveLink(linkId) {
    try {
      if (!linkId) {
        console.error("Missing linkId for deletion");
        return;
      }

      await linkService.remove(linkId);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkId));
    } catch (err) {
      console.error("Error deleting link:", err);
    }
  }


  if (!links) return <div>Loading...</div>
  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <LinksList links={links} onRemoveLink={onRemoveLink} />
    </div>

  )
}
