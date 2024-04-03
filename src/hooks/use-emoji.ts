import React from 'react';
interface EmojiProps {
  valueMessage: string;
  setValueMessage: React.Dispatch<React.SetStateAction<string>>;
}
export function useEmoji({ valueMessage, setValueMessage }: EmojiProps) {
  const [showed, setShowed] = React.useState(false);
  const showEmoji = function () {
    setShowed((prev) => !prev);
  };
  let emojies = ['😀', '😆', '😅', '🤣', '🙂', '🙃', '🥰'];
  const handleEmojiClick = function (i: number) {
    setValueMessage(valueMessage + emojies[i]);
  };

  return {
    handleEmojiClick,
    showEmoji,
    showed,
    emojies,
  };
}
