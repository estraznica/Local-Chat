import './emoji-chat-select.css';
import React from 'react';
import IconButton from '../../components/IconButton/IconButton';
import { IconChooseEmoji } from '../../components/IconComponents/IconComponents';
interface EmojiProps {
  onSelectEmoji: (emoji: string) => void;
}
export default function EmojiChatSelect({ onSelectEmoji }: EmojiProps) {
  const [showedEmoji, setShowedEmoj] = React.useState(false);
  const showEmoji = function () {
    setShowedEmoj((prev) => !prev);
  };
  let emojies = ['😀', '😆', '😅', '🤣', '🙂', '🙃', '🥰'];
  const handleEmojiClick = (emoji: string) => {
    onSelectEmoji(emoji);
  };

  return (
    <>
      {showedEmoji && (
        <div className="emojies">
          {emojies.map((emoji, i) => (
            <div className="emoji" key={i} onClick={() => handleEmojiClick(emoji)}>
              {emojies[i]}
            </div>
          ))}
        </div>
      )}
      <IconButton icon={<IconChooseEmoji />} onClick={showEmoji}></IconButton>
    </>
  );
}
