import type { Bet } from "./types";

// Mock data for our open bets
export const openBets: Bet[] = [
  {
    id: 1,
    title: "Sarah breaks up with Tom",
    participants: "Alice, Bob",
    stake: "0.1 ETH",
  },
  {
    id: 2,
    title: "Season finale of 'Dragons' is > 9 stars",
    participants: "Charlie, Dave",
    stake: "$20",
  },
  {
    id: 3,
    title: "Rains on Friday",
    participants: "Eve, Frank",
    stake: "0.05 ETH",
  },
];
