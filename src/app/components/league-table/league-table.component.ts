import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../services/league.service';
import { Team } from '../../models/team.interface';

@Component({
  selector: 'app-league-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="league-table">
      <h2>League Table</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let team of sortedTeams; let i = index">
            <td>{{i + 1}}</td>
            <td>
              <div class="team-info">
                <img *ngIf="team.logoUrl" [src]="team.logoUrl" alt="Team logo" class="team-logo">
                {{team.name}}
              </div>
            </td>
            <td>{{team.played}}</td>
            <td>{{team.won}}</td>
            <td>{{team.drawn}}</td>
            <td>{{team.lost}}</td>
            <td>{{team.goalsFor}}</td>
            <td>{{team.goalsAgainst}}</td>
            <td>{{team.goalsFor - team.goalsAgainst}}</td>
            <td>{{team.points}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .league-table {
      margin: 20px;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .team-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .team-logo {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  `]
})
export class LeagueTableComponent implements OnInit {
  sortedTeams: Team[] = [];

  constructor(private leagueService: LeagueService) {}

  ngOnInit() {
    this.leagueService.getTeams().subscribe(teams => {
      this.sortedTeams = this.sortTeams(teams);
    });
  }

  private sortTeams(teams: Team[]): Team[] {
    return [...teams].sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      const goalDiffA = a.goalsFor - a.goalsAgainst;
      const goalDiffB = b.goalsFor - b.goalsAgainst;
      if (goalDiffA !== goalDiffB) {
        return goalDiffB - goalDiffA;
      }
      return b.goalsFor - a.goalsFor;
    });
  }
}