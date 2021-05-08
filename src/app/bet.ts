export interface Bet {
    id: number;
    value: number;
  }

export interface BetRecord {
  user:string,
  time:string,
  initial: number;
  value: number;
  gain:number
}