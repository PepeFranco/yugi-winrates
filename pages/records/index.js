import Head from "next/head";
import { useEffect, useState } from "react";
import Router, { withRouter } from "next/router";
import Record from "../record";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";

const Records = ({
  router: {
    query: { order = "rating" },
  },
}) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords([]);
    fetch(`/api/records?order=${order}`).then((response) => {
      response.json().then((responseRecords) => {
        setRecords(responseRecords);
      });
    });
  }, [order]);

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
            <span className="title">All records</span>
            <select
              style={{ width: "200px", height: "25px" }}
              onChange={(e) => {
                Router.push(`/records?order=${e.currentTarget.value}`);
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
            .map((record, index) => <Record {...record} key={index} />)}
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Records);
