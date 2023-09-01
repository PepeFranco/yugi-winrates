import React from "react";

const getPlayedMatchups = (records) =>
  records.filter((record) => record.totalGames > 0).length;

const MatchupCounter = ({ records = [] }) =>
  records.length ? (
    <>
      - {getPlayedMatchups(records)}/{records.length} played
    </>
  ) : (
    <></>
  );

export default MatchupCounter;
