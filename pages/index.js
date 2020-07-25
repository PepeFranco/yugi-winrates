import Head from "next/head";
import Link from "next/link";
import decks from "../decks";
import Header from "./header";

const Home = () => (
  <div>
    <Header />
    <Head>
      <title>Yu-gi-oh! Winrates</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main style={{ padding: "20px" }}>
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
                    height: "200px",
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
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
