import React from 'react';

function FormatSuggestions(suggestions) {
  return suggestions.split('* ').map((item, index) => {
    if (index === 0) {
      return item.trim(); // First item will have leading newline, trim it
    }

    // Check if the item starts with "**" and ends with "*"
    if (item.startsWith('**') && item.endsWith('*')) {
      return (
        <li key={index}>
          <strong>{item.trim()}</strong>
        </li>
      );
    } else {
      return <li key={index}>{item.trim()}</li>;
    }
  });
}

export default FormatSuggestions;
