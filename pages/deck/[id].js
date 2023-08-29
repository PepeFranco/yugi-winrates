import Head from "next/head";
import { useEffect, useState } from "react";
import { withRouter, useRouter } from "next/router";

import Record from "../record";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";
import MatchupCounter from "../matchupCounter";

const Deck = ({
  router: {
    query: { id, order = "rating" },
  },
}) => {
  const router = useRouter();
  const [deck, setDeck] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords([]);
    if (id) {
      fetch(`/api/deck/${id}?order=${order}`).then((response) => {
        response.json().then(({ deck, records }) => {
          setDeck(deck);
          setRecords(records);
        });
      });
    }
  }, [id, order]);

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
            <span className="title">
              {deck?.name}
              <MatchupCounter records={records} />
            </span>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {
                router.push({
                  pathname: router.pathname,
                  query: { id, order: e.currentTarget.value },
                });
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
              deckType={deck.type}
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
