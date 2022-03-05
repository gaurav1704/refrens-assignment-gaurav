import React, { useState } from 'react'

export default function SearchCard(props) {
  const [styles] = useState({
    card: {textAlign:'left', padding:'10px'},
    cardTitle: {fontWeight:'bolder', paddingBottom:'5px', fontSize:'18px'},
    highlightedText: {color: 'blue'}
  });

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    let i=0;
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b key={i++} style={styles.highlightedText}>{part}</b> : part)}</span>;
  }

  return (
    <div 
      id={props.id} 
      key={props.id}
      style={{...styles.card, backgroundColor:props.id === props.active && 'lightyellow'}}
      onMouseMove={()=>{
          !props.keyPressed && props.setActive(props.id)
          props.setMouseMoved(true)
        }} 
    >
        <div style={styles.cardTitle}>{getHighlightedText(props.data.id, props.highlight)}</div>
        <div>{getHighlightedText(props.data.name, props.highlight)}</div>
        <div>{getHighlightedText(props.data.address, props.highlight)}</div>
        <div>{getHighlightedText(props.data.items.join(', '), props.highlight)}</div>
        <div>{getHighlightedText(props.data.pincode, props.highlight)}</div>
    </div>
  );
}
