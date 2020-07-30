import Head from "next/head";
import { useEffect, useState } from "react";
import Router, { withRouter } from "next/router";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";
import DeckImage from "../deckImage";
import WinRatePieChart from "../winRatePieChart";
import Link from "next/link";

const Decks = ({
  router: {
    query: { order = "winrate" },
  },
}) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    setDecks([]);
    fetch(`/api/decks?order=${order}`).then((response) => {
      response.json().then((responseDecks) => {
        setDecks(responseDecks);
      });
    });
  }, [order]);

  return (
    <div>
      <Header />
      <Head>
        <title>Yu-gi-oh! Winrates - All decks</title>
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
            <span className="title">All decks</span>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {
                Router.push(`/decks?order=${e.currentTarget.value}`);
              }}
              value={order}
            >
              <option value="release">Release order</option>
              <option value="winrate">Winrate</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="totalGames">Total Games</option>
            </select>
          </div>
        </div>

        {decks.length === 0 && <Loader />}

        {decks.length > 0 &&
          decks.map((deck, index) => {
            const {
              deckCode,
              deckName,
              deckColor,
              totalGames,
              wins,
              losses,
              winPercentage,
              lossPercentage,
            } = deck;
            return (
              <div key={index}>
                <div>
                  <Link href={`/deck/${deckCode}`}>
                    <a style={{ color: "black" }}>
                      <span>{deckName}</span>
                    </a>
                  </Link>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Link href={`/deck/${deckCode}`}>
                    <a style={{ color: "black" }}>
                      <DeckImage code={deckCode} />
                    </a>
                  </Link>
                  <WinRatePieChart
                    totalGames={totalGames}
                    winPercentage={winPercentage}
                    lossPercentage={lossPercentage}
                    winColor={deckColor}
                    lossColor="gray"
                    wins={wins}
                    losses={losses}
                  />
                </div>
              </div>
            );
          })}
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Decks);
