import Head from "next/head";
import { useEffect, useState } from "react";
import decks from "../../decks";
import Router, { withRouter } from "next/router";
import Record from "../record";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";

const Deck = ({
  router: {
    query: { id, order = "release" },
  },
}) => {
  const [deck, setDeck] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords([]);
    if (id) {
      const currentDeck = decks.filter(
        (deckToFilter) => deckToFilter.code === id
      )[0];
      setDeck(currentDeck);
      fetch(`/api/deck/${id}?order=${order}`).then((response) => {
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
            <h2 className="title">{deck?.name}</h2>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {
                Router.push(`/deck/${id}?order=${e.currentTarget.value}`);
              }}
              value={order}
            >
              <option value="release">Release order</option>
              <option value="rating">Rating</option>
              <option value="winrate">Winrate</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="totalGames">Total games</option>
            </select>
          </div>
        </div>
        {records.length === 0 && <Loader />}

        {records.length > 0 &&
          records.map((record, index) => (
            <Record
              deckCode={deck.code}
              deckName={deck.name}
              deckColor={deck.color}
              {...record}
              key={`${index}-${order}`}
            />
          ))}
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Deck);
