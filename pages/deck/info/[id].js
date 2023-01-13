import Head from "next/head";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import Header from "../../header";
import Footer from "../../footer";
import Main from "../../main";
import DeckImage from "../../deckImage";

const Deck = ({
  router: {
    query: { id, order = "rating" },
  },
}) => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/deck/info/${id}`).then((response) => {
        response.json().then((data) => {
          setDeck(data);
        });
      });
    }
  }, [id]);

  return (
    <div>
      <Header />
      <Head>
        <title>Yu-gi-oh! Winrates - {deck?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1 className="text-xl font-bold ">{deck.name}</h1>
        <span>{deck.releaseDate}</span>
        <DeckImage code={id} size="large" />
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Deck);
