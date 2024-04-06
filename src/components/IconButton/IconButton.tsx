import React from 'react';
import './icon-button.css';
interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button className="icon-button" onClick={onClick}>
      {icon}
    </button>
  );
}
