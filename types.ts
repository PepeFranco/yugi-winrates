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
  totalGames: number;
};

export type DeckMatchupRecord = GenericRecord & {
  opponentDeckName: string;
  rating: number;
  winPercentage: number;
};

export type IndividualDeckRecord = GenericRecord & {
  deckCode: string;
  wins: number;
  losses: number;
  deckColor: string;
};

export type IndividualDeckOrder =
  | "alphabetical"
  | "winrate"
  | "totalGames"
  | "release";
export type DeckMatchupOrder = IndividualDeckOrder | "rating";
