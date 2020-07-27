import Head from "next/head";
import { useEffect, useState } from "react";
import decks from "../../decks";
import Router, { withRouter } from "next/router";
import Record from ".";
import Header from "../header";
import Footer from "../footer";
import Main from "../main";
import Loader from "../loader";

const Report = ({
  router: {
    query: { key, secret },
  },
}) => {
  const [status, setStatus] = useState("");

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
              height: "200px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              const {
                winner: { value: winnerValue },
                loser: { value: loserValue },
              } = e.currentTarget;
              if (winnerValue === loserValue) return;
              if (!key || !secret) return;
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
                }),
              }).then((result) => {
                setStatus(result.statusText);
              });
            }}
          >
            <label htmlFor="winner">Winner</label>
            <select style={{ width: "200px", height: "25px" }} name="winner">
              {decks.map((deck) => (
                <option value={deck.code} key={`winner-${deck.code}`}>
                  {deck.name}
                </option>
              ))}
            </select>

            <label htmlFor="loser">Loser</label>
            <select style={{ width: "200px", height: "25px" }} name="loser">
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
              <h4>{status}</h4>
            </div>
          )}
        </div>
      </Main>
      <Footer />
    </div>
  );
};

export default withRouter(Report);
