import React, { useState } from 'react';
import './App.css';
import json from "./emojis.json";

function App() {
  const [emojiIndex, setEmojiIndex] = useState(0);
  /**
   * Create the heading bar
   */
  function createSvgHeading() {
    return json.map((item, index) =>
      <button className={`emoji-panel__btn ${emojiIndex === index ? 'active' : ''}`} key={index} onClick={() => setEmojiIndex(index)}> {createSvg(item.unicode, item.name)}</button >
    )
  }
  return (
    <div className="emoji-panel">
      <div className="emoji-panel__heading">
        {createSvgHeading()}
      </div>
      <div className="emoji-panel__body">
        {createSvgBody(emojiIndex)}
      </div>
    </div>
  );
}

/**
 * Create svg body where all the emojis come
 * @param {} index 
 */
function createSvgBody(index) {
  return json[index].emojis.map((item, index) =>
    <button className="emoji-panel__btn" key={index} onClick={() => onEmojiSelect(item)}>{createSvg(item.unicode, item.title)}</button>
  )
}
/**
 * Creating a svg
 * @param {*} unicode 
 * @param {*} title 
 */
function createSvg(unicode, title) {
  return (
    <svg width="25" height="25">
      <use href={`/sprite.svg#${unicode}`}>
        <title>{title}</title>
      </use>
    </svg>)
}

/**
 * function called when an emoji is selected, it returns the object which contains name and unicode
 * @param {*} item 
 */
function onEmojiSelect(item) {
  console.log(item);
}

export default App;
