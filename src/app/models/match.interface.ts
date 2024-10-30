export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  dateTime: Date;
  homeScore?: number;
  awayScore?: number;
  isCompleted: boolean;
}