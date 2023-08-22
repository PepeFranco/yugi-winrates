import Head from "next/head";
import { useState } from "react";
import { withRouter } from "next/router";
import decks from "../../decks";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import _ from "lodash";

const Report = ({
  router: {
    query: { key, secret, type = "structure" },
  },
}) => {
  const [status, setStatus] = useState("");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const filteredDecks = _.sortBy(
    decks.filter((deck) => deck.type === type),
    (deck) => deck.name
  );

  return (
    <div>
      <Header />
      <Head>
        <title>Yu-gi-oh! Winrates - Record</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "400px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const {
                winner: { value: winnerValue },
                loser: { value: loserValue },
              } = e.currentTarget;
              if (winnerValue === loserValue) return;
              // if (!key || !secret) return;
              setStatus("Loading");

              fetch("/api/report", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  winner: winnerValue,
                  loser: loserValue,
                  key,
                  secret,
                  type,
                }),
              }).then((result) => {
                setStatus(result.statusText);
              });
            }}
          >
            <label htmlFor="winner">Winner</label>
            <select
              style={{ width: "200px", height: "25px" }}
              name="winner"
              onChange={(e) => {
                setWinner(e.currentTarget.value);
              }}
              value={winner}
            >
              {filteredDecks.map((deck) => (
                <option value={deck.code} key={`winner-${deck.code}`}>
                  {deck.name}
                </option>
              ))}
            </select>
            <span
              style={{
                fontSize: "25px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                const winnerCopy = `${winner}`;
                const loserCopy = `${loser}`;
                setWinner(loserCopy);
                setLoser(winnerCopy);
              }}
            >
              🔄
            </span>
            <label htmlFor="loser">Loser</label>
            <select
              style={{ width: "200px", height: "25px" }}
              name="loser"
              onChange={(e) => {
                setLoser(e.currentTarget.value);
              }}
              value={loser}
            >
              {filteredDecks.map((deck) => (
                <option value={deck.code} key={`loser-${deck.code}`}>
                  {deck.name}
                </option>
              ))}
            </select>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "50px",
                width: "100%",
              }}
            >
              <input
                type="submit"
                value="Record"
                style={{
                  background: "black",
                  color: "white",
                  height: "30px",
                  width: "100%",
                }}
              />
            </div>
          </form>
          {status && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: status === "OK" ? "green" : "black",
              }}
            >
              <span>{status}</span>
            </div>
          )}
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Report);
