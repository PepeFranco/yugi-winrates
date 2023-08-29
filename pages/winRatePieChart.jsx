import { PieChart } from "react-minimal-pie-chart";
import colours from "./data/colours.json";
import _ from "lodash";

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
      const colourName = _.findKey(
        colours.standard,
        (colour) => colour === winColor
      );
      return colours.light[colourName];
    }
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
        animationEasing="cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        startAngle={90}
        style={{ height: "150px" }}
        labelStyle={{
          fontSize: "1em",
          fontFamily: "sans-serif",
          fill: colours.theme.white,
        }}
        label={(props) => {
          const percentage = props?.dataEntry?.percentage;
          if ((percentage > 0) & (totalGames > 0))
            return `${percentage.toFixed(0)}%`;
        }}
      />
      <div
        style={{
          height: "60px",
          background: colours.theme.primary,
          width: "100%",
          color: colours.theme.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            width: "90%",
            textAlign: "center",
            color: colours.theme.white,
            fontSize: "1.5em",
          }}
        >
          {`${wins} - ${losses}`}
        </span>
      </div>
    </div>
  );
};

export default WinRatePieChart;
