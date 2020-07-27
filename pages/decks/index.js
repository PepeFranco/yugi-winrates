import Head from "next/head";
import { useEffect, useState } from "react";
import Router, { withRouter } from "next/router";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";
import Counter from "../counter";
import DeckImage from "../deckImage";
import WinRatePieChart from "../winRatePieChart";
import Link from "next/link";

const Decks = ({
  router: {
    query: { order = "release" },
  },
}) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
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
            <h2 className="title">All decks</h2>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {
                Router.push(`/decks?order=${e.currentTarget.value}`);
              }}
              value={order}
            >
              <option value="release">Release order</option>
              <option value="rating">Rating</option>
              <option value="winrate">Winrate</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {decks.length === 0 && <Loader />}

        {decks.length > 0 &&
          decks.map((deck, index) => {
            const {
              deckCode,
              deckName,
              totalGames,
              wins,
              losses,
              winPercentage,
              lossPercentage,
            } = deck;
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Link href={`/deck/${deckCode}`}>
                      <a>
                        <h3>{deckName}</h3>
                        <DeckImage code={deckCode} />
                      </a>
                    </Link>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <WinRatePieChart
                      totalGames={totalGames}
                      winPercentage={winPercentage}
                      lossPercentage={lossPercentage}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      flex: 1,
                    }}
                  >
                    <Counter>{`Wins: ${wins}`}</Counter>
                    <Counter>{`Losses: ${losses}`}</Counter>
                  </div>
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
