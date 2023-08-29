import Head from "next/head";
import { useEffect, useState } from "react";
import { withRouter, useRouter } from "next/router";
import Record from "../record";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";
import MatchupCounter from "../matchupCounter";
import { useDefaultType } from "../../hooks/useDefaultType";
import { DeckMatchupOrderConstants } from "../../types";

const Records = () => {
  const router = useRouter();
  const { order, type } = router.query;
  const [records, setRecords] = useState([]);

  useDefaultType();

  const getOrderQuery = () => {
    if (typeof order === "string") {
      if (DeckMatchupOrderConstants.includes(order)) {
        return order;
      }
    }
    return "winrate";
  };

  useEffect(() => {
    setRecords([]);
    if (type) {
      fetch(`/api/records?order=${getOrderQuery()}&type=${type}`).then(
        (response) => {
          response.json().then((responseRecords) => {
            setRecords(responseRecords);
          });
        }
      );
    }
  }, [type, order]);

  return (
    <div>
      <Header />
      <Head>
        <title>Yu-gi-oh! Winrates - All time records</title>
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
              All records <MatchupCounter records={records} />
            </span>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {
                router.push({
                  pathname: router.pathname,
                  query: { order: e.currentTarget.value, type },
                });
              }}
              value={order}
            >
              <option value="rating">Rating</option>
              <option value="winrate">Winrate</option>
              <option value="totalGames">Total Games</option>
            </select>
          </div>
        </div>

        {records.length === 0 && <Loader />}

        {records.length > 0 &&
          records
            .slice(0, 50)
            .map((record, index) => (
              <Record {...record} key={index} deckType={type} />
            ))}
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Records);
