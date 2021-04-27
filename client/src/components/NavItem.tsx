import React from "react";

interface NavItemProps {
  title: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-background text-text-light hover:text-text-hover focus:outline-none font-extrabold"
    >
      {title}
    </button>
  );
};
