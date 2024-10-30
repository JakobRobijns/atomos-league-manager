import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../services/league.service';
import { Match } from '../../models/match.interface';
import { Team } from '../../models/team.interface';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="match-list">
      <h2>Matches</h2>
      <div class="matches">
        <div *ngFor="let match of matches" class="match-card">
          <div class="match-header">
            <span class="date">{{match.dateTime | date:'medium'}}</span>
            <span class="location">{{match.location}}</span>
          </div>
          <div class="match-teams">
            <div class="team">
              <img *ngIf="getTeam(match.homeTeam)?.logoUrl" 
                   [src]="getTeam(match.homeTeam)?.logoUrl" 
                   alt="Home team logo" 
                   class="team-logo">
              <span>{{getTeam(match.homeTeam)?.name}}</span>
            </div>
            <div class="score" *ngIf="match.isCompleted">
              {{match.homeScore}} - {{match.awayScore}}
            </div>
            <div class="team">
              <img *ngIf="getTeam(match.awayTeam)?.logoUrl" 
                   [src]="getTeam(match.awayTeam)?.logoUrl" 
                   alt="Away team logo" 
                   class="team-logo">
              <span>{{getTeam(match.awayTeam)?.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .match-list {
      margin: 20px;
      padding: 20px;
    }
    .matches {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .match-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .match-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #666;
      font-size: 0.9em;
    }
    .match-teams {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .team {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .team-logo {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
    .score {
      font-size: 1.2em;
      font-weight: bold;
    }
  `]
})
export class MatchListComponent implements OnInit {
  matches: Match[] = [];
  teams: Team[] = [];

  constructor(private leagueService: LeagueService) {}

  ngOnInit() {
    this.leagueService.getMatches().subscribe(matches => {
      this.matches = matches.sort((a, b) => 
        new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
      );
    });

    this.leagueService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  getTeam(id: string): Team | undefined {
    return this.teams.find(team => team.id === id);
  }
}