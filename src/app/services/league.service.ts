import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../models/team.interface';
import { Match } from '../models/match.interface';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private teams = new BehaviorSubject<Team[]>([]);
  private matches = new BehaviorSubject<Match[]>([]);

  getTeams(): Observable<Team[]> {
    return this.teams.asObservable();
  }

  getMatches(): Observable<Match[]> {
    return this.matches.asObservable();
  }

  addTeam(team: Omit<Team, 'id' | 'played' | 'won' | 'drawn' | 'lost' | 'goalsFor' | 'goalsAgainst' | 'points'>): void {
    const newTeam: Team = {
      ...team,
      id: Date.now().toString(),
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    };
    this.teams.next([...this.teams.value, newTeam]);
  }

  addMatch(match: Omit<Match, 'id' | 'isCompleted'>): void {
    const newMatch: Match = {
      ...match,
      id: Date.now().toString(),
      isCompleted: false
    };
    this.matches.next([...this.matches.value, newMatch]);
  }

  updateMatch(match: Match): void {
    const matches = this.matches.value.map(m => 
      m.id === match.id ? match : m
    );
    this.matches.next(matches);
    if (match.homeScore !== undefined && match.awayScore !== undefined) {
      this.updateLeagueTable(match);
    }
  }

  private updateLeagueTable(match: Match): void {
    const teams = [...this.teams.value];
    const homeTeam = teams.find(t => t.id === match.homeTeam);
    const awayTeam = teams.find(t => t.id === match.awayTeam);

    if (homeTeam && awayTeam) {
      // Update home team stats
      homeTeam.played++;
      homeTeam.goalsFor += match.homeScore!;
      homeTeam.goalsAgainst += match.awayScore!;

      // Update away team stats
      awayTeam.played++;
      awayTeam.goalsFor += match.awayScore!;
      awayTeam.goalsAgainst += match.homeScore!;

      if (match.homeScore! > match.awayScore!) {
        homeTeam.won++;
        homeTeam.points += 3;
        awayTeam.lost++;
      } else if (match.homeScore! < match.awayScore!) {
        awayTeam.won++;
        awayTeam.points += 3;
        homeTeam.lost++;
      } else {
        homeTeam.drawn++;
        awayTeam.drawn++;
        homeTeam.points++;
        awayTeam.points++;
      }

      this.teams.next(teams);
    }
  }
}