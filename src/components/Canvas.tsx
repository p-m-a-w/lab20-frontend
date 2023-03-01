import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

import Cell from "./Cell";

let client: Client;

let color: string;

function Canvas() {
  const [colorGrid, setColorGrid] = useState([[]]);

  useEffect(() => {
    if (!client) {
      color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      client = new Client({
        brokerURL: "ws://localhost:8080/demo-websocket",
        onConnect: () => {
        client.subscribe("/app/canvas", (message) => {
          const body = JSON.parse(message.body);
          setColorGrid(body["colorGrid"]);
        });

        client.subscribe("/topic/canvas", (message) => {
          const body = JSON.parse(message.body);
          setColorGrid(body["colorGrid"]);
        });
      }});

      client.activate();
    }
  }, []);

  const paint = (x: number, y: number) => {
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/paint",
          body: JSON.stringify({
            color: color, // random color
            posX: x,
            posY: y,
          }),
        });
      }
    }
  };

  return (
    <div>
      <table
        style={{
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          {colorGrid.map((row, j) => (
            <tr key={j}>
              {row.map((col, i) => (
                <Cell
                  x={i}
                  y={j}
                  key={`${i}${j}`}
                  paint={paint}
                  color={colorGrid[j][i]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Canvas;
