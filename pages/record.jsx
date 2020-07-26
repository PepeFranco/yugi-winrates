import Link from "next/link";
import { PieChart } from "react-minimal-pie-chart";

const DeckImage = ({ code }) => (
  <div style={{ width: "100px", justifyContent: "center", display: "flex" }}>
    <img
      style={{
        height: "100px",
      }}
      src={`/${code}.jpg`}
    ></img>
  </div>
);

const Counter = ({ children }) => (
  <h3
    style={{
      fontSize: "50px",
    }}
  >
    {children}
  </h3>
);

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

export default ({
  wins,
  losses,
  totalGames,
  winPercentage,
  lossPercentage,
  opponentDeckName,
  opponentDeckCode,
  deckCode,
  deckName,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link href={`/deck/${deckCode}`}>
          <a>
            <h3>{deckName}</h3>
          </a>
        </Link>
        <Link href={`/deck/${opponentDeckCode}`}>
          <a href="#" style={{ textAlign: "right" }}>
            <h3>{opponentDeckName}</h3>
          </a>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link href={`/deck/${deckCode}`}>
          <a>
            <DeckImage code={deckCode} />
          </a>
        </Link>
        <Counter>{wins}</Counter>
        <WinRatePieChart
          totalGames={totalGames}
          winPercentage={winPercentage}
          lossPercentage={lossPercentage}
        />
        <Counter>{losses}</Counter>
        <Link href={`/deck/${opponentDeckCode}`}>
          <a href="#">
            <DeckImage code={opponentDeckCode} />
          </a>
        </Link>
      </div>
    </div>
  );
};
