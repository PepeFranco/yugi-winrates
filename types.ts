export type DeckType = "structure" | "speed";

export type Deck = {
  month?: number;
  year: number;
  type: DeckType;
  code: string;
  name: string;
  color: string;
};

export type SpeedDuelDeck = Omit<Deck, "type"> & { type: "speed" };
export type StructureDeck = Omit<Deck, "type"> & { type: "structure" };

export type GenericRecord = {
  deck: Deck;
  wins: number;
  winPercentage: number;
  losses: number;
  lossPercentage: number;
  totalGames: number;
};

export type DeckMatchupRecord = GenericRecord & {
  opponentDeck: Deck;
  rating: number;
};

export type IndividualDeckRecord = GenericRecord;

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
