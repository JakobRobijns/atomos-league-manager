import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TeamFormComponent } from './app/components/team-form/team-form.component';
import { MatchFormComponent } from './app/components/match-form/match-form.component';
import { LeagueTableComponent } from './app/components/league-table/league-table.component';
import { MatchListComponent } from './app/components/match-list/match-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TeamFormComponent,
    MatchFormComponent,
    LeagueTableComponent,
    MatchListComponent
  ],
  template: `
    <div class="container">
      <header>
        <h1>Soccer League Manager</h1>
      </header>
      
      <div class="content">
        <div class="forms-section">
          <app-team-form></app-team-form>
          <app-match-form></app-match-form>
        </div>
        
        <app-league-table></app-league-table>
        <app-match-list></app-match-list>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #333;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    .forms-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  `]
})
export class App {
  name = 'Soccer League Manager';
}

bootstrapApplication(App);