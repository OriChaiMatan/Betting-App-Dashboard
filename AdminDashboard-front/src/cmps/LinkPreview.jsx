import React from 'react';

export function LinkPreview({ link, onEdit, onRemoveLink }) {
  return (
    <div className="link-preview">
      <img src={link.imgUrl} alt={link.title} className="link-image" />
      <div className="link-details">
        <h3 className="link-title">{link.title}</h3>
        <p className="link-url"><a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a></p>
      </div>
      {/* <button className="edit-button" onClick={() => onEdit(link)}>Edit</button> */}
      <button className="delete-button" onClick={() => onRemoveLink(link._id)}>Delete</button>
    </div>
  );
}
