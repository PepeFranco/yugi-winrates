import Head from "next/head";
import Link from "next/link";
import decks from "../decks";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import DeckImage from "./deckImage";

import { withRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const { type } = router.query;
  // const [filteredDecks, setFilteredDecks] = useState([]);

  const filteredDecks = decks.filter((deck) => deck.type === type);
  // useEffect(() => {
  //   if (!type) {
  //     return;
  //   }

  // }, []);

  useEffect(() => {
    if (router.isReady && !type) {
      router.query.type = "structure";
      router.push({ pathname: router.pathname, query: router.query });
    }
  }, [router.isReady]);

  return (
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
          {filteredDecks.map((deck, index) => {
            return (
              <Link href={`/deck/${deck.code}`} key={index} legacyBehavior>
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
                    <DeckImage code={deck.code} />
                  </div>
                  <a href="#" style={{ color: "black" }}>
                    {deck.name}
                  </a>
                </div>
              </Link>
            );
          })}
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Home);
