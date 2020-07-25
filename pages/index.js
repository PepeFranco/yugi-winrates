import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("/api/records").then((response) => {
      response.json().then((responseRecords) => setRecords(responseRecords));
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Yu-gi-oh! Winrates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Yu-gi-oh! Win rates</h1>

        <p>{JSON.stringify(records)}</p>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
