import React from "react";

export type CellProps = {
  x: number;
  y: number;
  color: string;
  paint: (x: number, y: number) => void;
};

const Cell = ({ x, y, color, paint }: CellProps) => {
  return (
    <td
      draggable='true'
      style={{
        backgroundColor: color,
        width: "1.5rem",
        height: "1.5rem",
        cursor: "pointer",
        border: "1px solid"
      }}
      onClick={() => paint(x, y)}
      onDragEnter={() => paint(x, y)}
    ></td>
  );
};

export default React.memo(Cell);
