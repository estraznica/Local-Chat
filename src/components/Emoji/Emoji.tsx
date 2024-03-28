import './emoji.css';
import React from 'react';

export default function Emoji() {
  let emojies = ['😀', '😆', '😅', '🤣', '🙂', '🙃', '🥰'];
  return (
    <div className="wrapper">
      {emojies.map((emojie, i) => (
        <div className="emoji" key={i}>
          {emojies[i]}
        </div>
      ))}
    </div>
  );
}
