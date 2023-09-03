import Head from "next/head";
import { useEffect, useState } from "react";
import { withRouter, useRouter } from "next/router";

import Record from "../record";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";
import MatchupCounter from "../matchupCounter";
import { Deck, DeckMatchupRecord } from "../../types";
import Dropdown from "../dropdown";

const DeckPage = ({}) => {
  const router = useRouter();
  const { id, order = "rating" } = router.query;
  const [deck, setDeck] = useState<Deck | null>(null);
  const [records, setRecords] = useState<DeckMatchupRecord[]>([]);

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
            <Dropdown
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
            </Dropdown>
          </div>
        </div>
        {records.length === 0 && <Loader />}

        {records.length > 0 &&
          records.map((record, index) => (
            <Record {...record} key={`${index}-${order}`} />
          ))}
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(DeckPage);
