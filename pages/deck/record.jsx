import Link from "next/link";
import { PieChart } from "react-minimal-pie-chart";

const DeckImage = ({ code }) => (
  <div style={{ width: "150px", justifyContent: "center", display: "flex" }}>
    <img
      style={{
        height: "150px",
      }}
      src={`/${code}.jpg`}
    ></img>
  </div>
);

const Counter = ({ children }) => (
  <h2
    style={{
      fontSize: "50px",
    }}
  >
    {children}
  </h2>
);

const WinRatePieChart = ({ opponentDeck, deck, records }) => {
  const wins = records?.[opponentDeck.code]?.wins || 0;
  const losses = records?.[opponentDeck.code]?.losses || 0;

  const totalGames = wins + losses;
  const winPercentage = (wins * 100) / totalGames;
  const lossPercentage = (losses * 100) / totalGames;

  const pieData =
    totalGames > 0
      ? [
          {
            title: deck?.name,
            value: winPercentage,
            color: "#3498db",
          },
          {
            title: opponentDeck?.name,
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
      <PieChart data={pieData} />
    </div>
  );
};

export default ({ opponentDeck, deck, records, deckColor }) => {
  const wins = records?.[opponentDeck?.code]?.wins || 0;
  const losses = records?.[opponentDeck?.code]?.losses || 0;
  return (
    <div>
      <div>
        <Link href={`/deck/${opponentDeck?.code}`}>
          <h2>
            <a href="#">{opponentDeck?.name}</a>
          </h2>
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
        <DeckImage code={deck?.code} />
        <Counter>{wins}</Counter>
        <WinRatePieChart
          opponentDeck={opponentDeck}
          deck={deck}
          records={records}
          deckColor={deckColor}
        />
        <Counter>{losses}</Counter>
        <Link href={`/deck/${opponentDeck?.code}`}>
          <a href="#">
            <DeckImage code={opponentDeck?.code} />
          </a>
        </Link>
      </div>
    </div>
  );
};
