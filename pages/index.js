import Head from "next/head";
import { useEffect, useState } from "react";
import decks from "./decks";

const Home = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("/api/records").then((response) => {
      response.json().then((responseRecords) => setRecords(responseRecords));
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Yu-gi-oh! Winrates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Yu-gi-oh! Win rates</h1>

        {/* <p>{JSON.stringify(records)}</p> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {decks.map((deck) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{
                      display: "block",
                      maxWidth: "100px",
                      maxHeight: "200px",
                      width: "auto",
                      height: "auto",
                    }}
                    key={deck.code}
                    src={`/${deck.code}.jpg`}
                  ></img>
                </div>
                <h2>{deck.name}</h2>
              </div>
            );
          })}
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
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

export default Home;
