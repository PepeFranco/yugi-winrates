import { PieChart } from "react-minimal-pie-chart";
import { black, gray } from "../decks";

const lightenDarkenColor = (color, amount) => {
  let usePound = false;
  if (color[0] == "#") {
    color = color.slice(1);
    usePound = true;
  }

  let num = parseInt(color, 16);

  let r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

const WinRatePieChart = ({
  totalGames,
  winPercentage,
  lossPercentage,
  winColor,
  lossColor,
  wins,
  losses,
}) => {
  const getLossColor = () => {
    if (!lossColor) return "#d35400";
    if (winColor === lossColor) {
      if (lossColor === black) return lightenDarkenColor(gray, -20);
      return lightenDarkenColor(lossColor, -20);
    }
    if (lossColor === black) return gray;
    return lossColor;
  };
  const getWinColor = () => {
    if (!winColor) return "#3498db";
    if (winColor === black) return gray;
    return winColor;
  };
  const pieData =
    totalGames > 0
      ? [
          {
            value: winPercentage,
            color: getWinColor(),
          },
          {
            value: lossPercentage,
            color: getLossColor(),
          },
        ]
      : [{ value: 100, color: "gray" }];

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <PieChart
        data={pieData}
        animate={true}
        animationDuration={1000}
        startAngle={90}
        style={{ height: "150px" }}
        label={(props) => {
          const percentage = props?.dataEntry?.percentage;
          const color = props?.dataEntry?.color;
          if ((percentage > 0) & (totalGames > 0))
            return `${percentage.toFixed(0)}%`;
        }}
      />
      <span>{`${wins}-${losses}`}</span>
    </div>
  );
};

export default WinRatePieChart;
