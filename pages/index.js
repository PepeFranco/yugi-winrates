import Head from "next/head";
import Link from "next/link";
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
              <Link href={`/deck/${deck.code}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                    padding: "20px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    key={deck.code}
                    src={`/${deck.code}.jpg`}
                  ></img>
                  <h2>
                    <a href="#">{deck.name}</a>
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

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

export default Home;
