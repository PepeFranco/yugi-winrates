import Head from "next/head";
import Link from "next/link";
import decks from "../../decks";
import Header from "../header";
import Main from "../main";

const Home = () => (
  <div>
    <Header />
    <Head>
      <title>Yu-gi-oh! Winrates</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {decks.map((deck, index) => {
          return (
            <Link href={`/deck/${deck.code}`} key={index}>
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
    </Main>
  </div>
);

export default Home;
