import { useState } from "react";
import "./App.scss";
import emojiArray from "./emojis.json";
import twemoji from "twemoji";

function App() {
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [selectedEmoji, setSelectedEmoji] = useState(null);

	function createPickerHeader() {
		return emojiArray.map((category, index) => (
			<button
				className={`emoji-btn ${
					selectedCategory === index ? "category--active" : ""
				}`}
				onClick={() => setSelectedCategory(index)}
				key={index}
			>
				{createSvgIcon(category.unicode, category.name)}
			</button>
		));
	}

	function createPickerBody() {
		return emojiArray[selectedCategory].emojis.map((emoji, index) => (
			<button
				className="emoji-btn"
				key={index}
				onClick={() => setSelectedEmoji(emoji)}
			>
				{createSvgIcon(emoji.unicode, emoji.name)}
			</button>
		));
	}

	function createSvgIcon(unicode, title) {
		return (
			<svg width={25} height={25}>
				<use href={`/sprite.svg#${unicode}`}>
					<title>{title}</title>
				</use>
			</svg>
		);
	}

	function renderEmojiString(char) {
		const htmlString = twemoji.parse(char, {
			folder: "svg",
			ext: ".svg",
		});
		return { __html: htmlString };
	}

	return (
		<div className="emoji-panel">
			<header className="emoji-panel__header">{createPickerHeader()}</header>
			<div className="emoji-panel__body">{createPickerBody()}</div>
			{selectedEmoji && (
        <>
          <div>{JSON.stringify(selectedEmoji)}</div>
          <div
            dangerouslySetInnerHTML={renderEmojiString(selectedEmoji.char)}
          ></div>
        </>
			)}
		</div>
	);
}

export default App;
