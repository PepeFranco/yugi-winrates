import Head from "next/head";
import { useState, useEffect } from "react";
import { withRouter, useRouter } from "next/router";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import _ from "lodash";
import { useDefaultType } from "../../hooks/useDefaultType";
import colours from "../data/colours.json";

const Report = () => {
  useDefaultType();
  const [status, setStatus] = useState("");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");

  const router = useRouter();
  const { key, secret, type } = router.query;
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    if (type) {
      fetch(`/api/decks/?type=${type}&skipRecords=true`).then((response) => {
        response.json().then((responseRecords) => {
          setDecks(responseRecords);
        });
      });
    }
  }, [type]);

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
              {decks.map((deck) => (
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
              {decks.map((deck) => (
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
                  background: colours.theme.black,
                  color: colours.theme.white,
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
