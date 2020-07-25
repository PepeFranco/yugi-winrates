import Head from "next/head";
import { useEffect, useState } from "react";
import decks from "../decks";
import { withRouter } from "next/router";
import Record from "./record";

const Deck = ({
  router: {
    query: { id },
  },
}) => {
  const [deck, setDeck] = useState([]);
  const [otherDecks, setOtherDecks] = useState([]);
  const [records, setRecords] = useState({});

  useEffect(() => {
    const currentDeck = decks.filter(
      (deckToFilter) => deckToFilter.code === id
    )[0];
    const nonCurrentDecks = decks.filter(
      (deckToFilter) => deckToFilter.code !== id
    );
    setDeck(currentDeck);
    setOtherDecks(nonCurrentDecks);
  }, [id]);

  useEffect(() => {
    if (deck) {
      fetch(`/api/deck/${deck.code}`).then((response) => {
        response.json().then((responseRecords) => {
          setRecords(responseRecords);
        });
      });
    }
  }, [deck]);

  return (
    <div>
      <Head>
        <title>Yu-gi-oh! Winrates - {deck?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "720px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <img
                style={{
                  height: "100px",
                }}
                src={`/${deck?.code}.jpg`}
              ></img>
              <h1 className="title">{deck?.name}</h1>
            </div>

            {otherDecks.map((opponentDeck) => (
              <Record
                opponentDeck={opponentDeck}
                deck={deck}
                records={records}
                key={opponentDeck.code}
              />
            ))}
          </div>
        </div>
      </main>

      <style jsx>{``}</style>
      <style jsx global>{`
        html,
        body {
          padding: 20px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default withRouter(Deck);
