import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="team-form">
      <h2>Add New Team</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="name">Team Name:</label>
          <input 
            id="name" 
            type="text" 
            [(ngModel)]="teamName" 
            name="name" 
            required>
        </div>
        <div>
          <label for="members">Team Members (comma-separated):</label>
          <input 
            id="members" 
            type="text" 
            [(ngModel)]="teamMembers" 
            name="members">
        </div>
        <div>
          <label for="logo">Logo URL:</label>
          <input 
            id="logo" 
            type="text" 
            [(ngModel)]="logoUrl" 
            name="logo">
        </div>
        <button type="submit">Add Team</button>
      </form>
    </div>
  `,
  styles: [`
    .team-form {
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
    input {
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
export class TeamFormComponent {
  teamName = '';
  teamMembers = '';
  logoUrl = '';

  constructor(private leagueService: LeagueService) {}

  onSubmit() {
    if (this.teamName.trim()) {
      this.leagueService.addTeam({
        name: this.teamName,
        members: this.teamMembers ? this.teamMembers.split(',').map(m => m.trim()) : undefined,
        logoUrl: this.logoUrl || undefined
      });
      this.resetForm();
    }
  }

  private resetForm() {
    this.teamName = '';
    this.teamMembers = '';
    this.logoUrl = '';
  }
}