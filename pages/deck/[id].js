import Head from "next/head";
import { useEffect, useState } from "react";
import decks from "../../decks";
import { withRouter } from "next/router";
import Record from "./record";
import Header from "../header";
import Main from "../main";

const Deck = ({
  router: {
    query: { id, order },
  },
}) => {
  const [deck, setDeck] = useState([]);
  const [records, setRecords] = useState({});

  useEffect(() => {
    if (id) {
      const currentDeck = decks.filter(
        (deckToFilter) => deckToFilter.code === id
      )[0];
      const nonCurrentDecks = decks.filter(
        (deckToFilter) => deckToFilter.code !== id
      );
      setDeck(currentDeck);
      fetch(`/api/deck/${currentDeck.code}?order=${order}`).then((response) => {
        response.json().then((responseRecords) => {
          setRecords(responseRecords);
        });
      });
    }
  }, [id]);

  return (
    <div>
      <Header />
      <Head>
        <title>Yu-gi-oh! Winrates - {deck?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1 className="title">{deck?.name}</h1>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {}}
              defaultValue={"release"}
            >
              <option value="release">Release order</option>
              <option value="balanced">Balanced matches</option>
              <option value="winrate">Winrate</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {Object.keys(records).map((key) => (
          <Record
            deckCode={deck.code}
            opponentDeckCode={key}
            {...records[key]}
            key={key}
          />
        ))}
      </Main>
    </div>
  );
};

export default withRouter(Deck);
