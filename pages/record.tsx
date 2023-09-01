import DeckBlock from "./deckBlock";
import WinRatePieChart from "./winRatePieChart";
import Card from "./card";
import { DeckMatchupRecord } from "../types";

export default ({
  wins,
  losses,
  totalGames,
  winPercentage,
  lossPercentage,
  opponentDeck,
  deck,
}: DeckMatchupRecord) => {
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          maxWidth: "500px",
        }}
      >
        <DeckBlock {...deck} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WinRatePieChart
            totalGames={totalGames}
            winPercentage={winPercentage}
            lossPercentage={lossPercentage}
            winColor={deck.color}
            lossColor={opponentDeck.color}
            wins={wins}
            losses={losses}
          />
        </div>
        <DeckBlock {...opponentDeck} />
      </div>
    </Card>
  );
};
