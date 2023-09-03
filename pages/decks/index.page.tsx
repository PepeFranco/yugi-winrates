import Head from "next/head";
import React, { useEffect, useState } from "react";
import { withRouter, useRouter } from "next/router";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";
import WinRatePieChart from "../winRatePieChart";
import MatchupCounter from "../matchupCounter";
import { useDefaultType } from "../../hooks/useDefaultType";
import DeckBlock from "../deckBlock";
import colours from "../data/colours.json";
import Pill from "../pill";

import {
  IndividualDeckOrder,
  IndividualDeckRecord,
  IndividualDeckOrderConstants,
} from "../../types";
import Card from "../card";
import Dropdown from "../dropdown";

export const Decks = () => {
  const router = useRouter();
  const { order, type } = router.query;
  const [decks, setDecks] = useState<IndividualDeckRecord[]>([]);

  const getOrderQuery = (): IndividualDeckOrder => {
    if (typeof order === "string") {
      if (IndividualDeckOrderConstants.includes(order as IndividualDeckOrder)) {
        return order as IndividualDeckOrder;
      }
    }
    return "winrate";
  };

  useDefaultType();

  useEffect(() => {
    if (type) {
      setDecks([]);
      const request = `/api/decks?order=${getOrderQuery()}&type=${type}`;
      fetch(request).then((response) => {
        response.json().then((responseRecords: IndividualDeckRecord[]) => {
          setDecks(responseRecords);
        });
      });
    }
  }, [type, order]);

  return (
    <div style={{ background: colours.theme.white }}>
      <Header />
      <Head>
        <title>Yu-gi-oh! Winrates - All decks</title>
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
            <div>
              <Pill>
                All decks
                <MatchupCounter records={decks} />
              </Pill>
            </div>
            <Dropdown
              onChange={(e) => {
                router.push({
                  pathname: router.pathname,
                  query: { order: e.currentTarget.value, type },
                });
              }}
              // @ts-ignore
              value={order}
            >
              <option value="release">Release order</option>
              <option value="winrate">Winrate</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="totalGames">Total Games</option>
            </Dropdown>
          </div>
        </div>

        {decks.length === 0 && <Loader />}

        {decks.length > 0 &&
          decks.map((record, index) => {
            const { deck, ...restRecord } = record;
            return (
              <Card
                key={index}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <DeckBlock {...deck} />

                  <WinRatePieChart
                    {...restRecord}
                    winColor={deck.color}
                    lossColor="gray"
                  />
                </div>
              </Card>
            );
          })}
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Decks);
