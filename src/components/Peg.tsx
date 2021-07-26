import React from "react";

interface PegProps {
  isActive: string;
  color: string;
  onClick(): any;
  colorClass: string;
}

const Peg: React.FC<PegProps> = (props) => {
const activeClass = props.isActive ? "peg--active" : "";
const colorClass = `peg--${props.color}`;
return (
  <div
    onClick={() => props.onClick()}
    className={`peg ${activeClass} ${colorClass}`}
  />
);
};

export default Peg