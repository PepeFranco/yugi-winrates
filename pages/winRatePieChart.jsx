import { PieChart } from "react-minimal-pie-chart";
import colours from "./data/colours.json";
import _ from 'lodash'

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
    if (!lossColor) return colours.standard.gray;
    if (winColor === lossColor) {
      const colourName = _.findKey(colours.standard, colour => colour === winColor)
      return colours.light[colourName]
    }
    if (lossColor === colours.standard.black) return colours.standard.gray;
    return lossColor;
  };
  const getWinColor = () => {
    if (!winColor) return colours.standard.gray;
    if (winColor === colours.standard.black) return colours.standard.gray;
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
      : [{ value: 100, color: colours.standard.gray }];

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
