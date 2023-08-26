export type DeckType = "structure" | "speed";

export type Deck = {
  type: DeckType;
  code: string;
  name: string;
  color: string;
};

export type SpeedDuelDeck = Omit<Deck, "type"> & { type: "speed" };
export type StructureDeck = Omit<Deck, "type"> & { type: "structure" };

export type GenericRecord = {
  deckName: string;
  type: DeckType;
  winPercentage: number;
  lossPercentage: number;
  totalGames: number;
};

export type DeckMatchupRecord = GenericRecord & {
  opponentDeckName: string;
  rating: number;
};

export type IndividualDeckRecord = GenericRecord & {
  deckCode: string;
  wins: number;
  losses: number;
  deckColor: string;
};

export const IndividualDeckOrderConstants = [
  "alphabetical",
  "winrate",
  "totalGames",
  "release",
] as const;
export type IndividualDeckOrder = typeof IndividualDeckOrderConstants[number];

export const DeckMatchupOrderConstants = [
  ...IndividualDeckOrderConstants,
  "rating" as const,
];

export type DeckMatchupOrder = typeof DeckMatchupOrderConstants[number];
