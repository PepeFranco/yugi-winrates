import Head from "next/head";
import { useEffect, useState } from "react";
import Router, { withRouter } from "next/router";
import Record from "../record";
import Header from "../header";
import Main from "../main";

const Deck = ({
  router: {
    query: { order = "release" },
  },
}) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(`/api/records?order=${order}`).then((response) => {
      response.json().then((responseRecords) => {
        setRecords(responseRecords);
      });
    });
  }, []);

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
            <h1 className="title">All records</h1>
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
            </select>
          </div>
        </div>

        {records.map((record, index) => (
          <Record {...record} key={index} />
        ))}
      </Main>
    </div>
  );
};

export default withRouter(Deck);
