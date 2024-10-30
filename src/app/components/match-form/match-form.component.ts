import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../services/league.service';
import { Team } from '../../models/team.interface';
import { Match } from '../../models/match.interface';

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="match-form">
      <h2>Add/Edit Match</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="homeTeam">Home Team:</label>
          <select 
            id="homeTeam" 
            [(ngModel)]="selectedHomeTeam" 
            name="homeTeam" 
            required>
            <option [ngValue]="null">Select Home Team</option>
            <option *ngFor="let team of teams" [value]="team.id">
              {{team.name}}
            </option>
          </select>
        </div>
        <div>
          <label for="awayTeam">Away Team:</label>
          <select 
            id="awayTeam" 
            [(ngModel)]="selectedAwayTeam" 
            name="awayTeam" 
            required>
            <option [ngValue]="null">Select Away Team</option>
            <option *ngFor="let team of teams" [value]="team.id">
              {{team.name}}
            </option>
          </select>
        </div>
        <div>
          <label for="location">Location:</label>
          <input 
            id="location" 
            type="text" 
            [(ngModel)]="location" 
            name="location" 
            required>
        </div>
        <div>
          <label for="dateTime">Date and Time:</label>
          <input 
            id="dateTime" 
            type="datetime-local" 
            [(ngModel)]="dateTime" 
            name="dateTime" 
            required>
        </div>
        <div *ngIf="editMode">
          <label for="homeScore">Home Team Score:</label>
          <input 
            id="homeScore" 
            type="number" 
            [(ngModel)]="homeScore" 
            name="homeScore">
          <label for="awayScore">Away Team Score:</label>
          <input 
            id="awayScore" 
            type="number" 
            [(ngModel)]="awayScore" 
            name="awayScore">
        </div>
        <button type="submit">{{editMode ? 'Update' : 'Add'}} Match</button>
      </form>
    </div>
  `,
  styles: [`
    .match-form {
      max-width: 400px;
      margin: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    form div {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  `]
})
export class MatchFormComponent implements OnInit {
  teams: Team[] = [];
  selectedHomeTeam: string | null = null;
  selectedAwayTeam: string | null = null;
  location = '';
  dateTime = '';
  homeScore?: number;
  awayScore?: number;
  editMode = false;
  editMatchId?: string;

  constructor(private leagueService: LeagueService) {}

  ngOnInit() {
    this.leagueService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  onSubmit() {
    if (this.selectedHomeTeam && this.selectedAwayTeam && this.location && this.dateTime) {
      const matchData = {
        homeTeam: this.selectedHomeTeam,
        awayTeam: this.selectedAwayTeam,
        location: this.location,
        dateTime: new Date(this.dateTime),
        homeScore: this.homeScore,
        awayScore: this.awayScore
      };

      if (this.editMode && this.editMatchId) {
        this.leagueService.updateMatch({
          ...matchData,
          id: this.editMatchId,
          isCompleted: this.homeScore !== undefined && this.awayScore !== undefined
        });
      } else {
        this.leagueService.addMatch(matchData);
      }

      this.resetForm();
    }
  }

  private resetForm() {
    this.selectedHomeTeam = null;
    this.selectedAwayTeam = null;
    this.location = '';
    this.dateTime = '';
    this.homeScore = undefined;
    this.awayScore = undefined;
    this.editMode = false;
    this.editMatchId = undefined;
  }
}