import Head from "next/head";
import Link from "next/link";
import decks from "../decks";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";

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
                  justifyContent: "space-between",
                  width: "150px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                    }}
                    key={deck.code}
                    src={`/${deck.code}.jpg`}
                  />
                </div>
                <h3>
                  <a href="#">{deck.name}</a>
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </Main>
    <Footer />
  </div>
);

export default Home;
