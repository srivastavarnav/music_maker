import { useState } from "react";

type BlockType = {
  rowId: number;
  colId: number;
  playNote: ({ note, duration }: { note: string; duration?: string }) => void;
  note: string;
};

const red: string = "bg-red-600";
const orange: string = "bg-orange-400";
const yellow: string = "bg-yellow-300";
const green: string = "bg-green-400";
const darkGreen: string = "bg-green-700 ";
const purple: string = "bg-purple-600";
const pink: string = "bg-pink-400";

const colors = [pink, purple, darkGreen, green, yellow, orange, red];

const Block = ({ rowId, colId, playNote, note }: BlockType) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const selectBlock = (event: React.MouseEvent) => {
    if (event.type === "mouseenter" && event.buttons === 1) {
      setIsSelected(true);
      playNote({ note });
    } else if (event.type === "click") {
      if (!isSelected) playNote({ note });
      setIsSelected(!isSelected);
    }
  };

  return (
    <div
      onMouseEnter={selectBlock}
      onClick={selectBlock}
      className={`h-[calc(100vw/32*0.85)] border-solid border-[0.5px] border-blue-100 ${
        colId % 2 === 0 ? "border-r-blue-400" : ""
      } ${rowId === 7 ? "border-t-blue-400" : ""}
      ${isSelected ? colors[rowId % colors.length] : ""}
      `}
    ></div>
  );
};

export default Block;
