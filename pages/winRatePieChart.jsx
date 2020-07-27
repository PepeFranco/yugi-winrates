import { PieChart } from "react-minimal-pie-chart";
const WinRatePieChart = ({ totalGames, winPercentage, lossPercentage }) => {
  const pieData =
    totalGames > 0
      ? [
          {
            value: winPercentage,
            color: "#3498db",
          },
          {
            value: lossPercentage,
            color: "#d35400",
          },
        ]
      : [{ value: 100, color: "gray" }];

  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        padding: "10px",
      }}
    >
      <PieChart
        data={pieData}
        label={(props) => {
          const percentage = props?.dataEntry?.percentage;
          const color = props?.dataEntry?.color;
          if ((percentage > 0) & (color !== "gray"))
            return `${percentage.toFixed(0)}%`;
        }}
      />
    </div>
  );
};

export default WinRatePieChart;
