import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import DeckBlock from "./deckBlock";

import React, { withRouter, useRouter } from "next/router";
import { useDefaultType } from "../hooks/useDefaultType";
import { useState, useEffect } from "react";

import { IndividualDeckRecord } from "../types";

const Home = () => {
  const router = useRouter();
  const { type } = router.query;
  const [decks, setDecks] = useState<IndividualDeckRecord[]>([]);
  useEffect(() => {
    if (type) {
      fetch(`/api/decks/?type=${type}&skipRecords=true`).then((response) => {
        response.json().then((responseRecords: IndividualDeckRecord[]) => {
          setDecks(responseRecords);
        });
      });
    }
  }, [type]);

  useDefaultType();

  return (
    <div style={{ minHeight: "100vh" }}>
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
          {decks.map((deck) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                key={deck.deckCode}
              >
                <DeckBlock
                  code={deck.deckCode}
                  name={deck.deckName}
                  type={deck.type}
                />
              </div>
            );
          })}
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Home);
