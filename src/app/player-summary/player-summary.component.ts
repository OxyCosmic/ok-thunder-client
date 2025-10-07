import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {PlayersService} from '../_services/players.service';
import {PlayerSummary} from './player-summary.interface';

@UntilDestroy()
@Component({
  selector: 'player-summary-component',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerSummaryComponent implements OnInit, OnDestroy {
  /** Current player summary data */
  playerSummary: PlayerSummary | null = null;
  
  /** Loading state */
  isLoading: boolean = true;
  
  /** Error message */
  errorMessage: string = '';
  
  /** Current player ID */
  currentPlayerID: number = 1;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {

  }

  ngOnInit(): void {
    // Get playerID from route parameter, default to 1 if not provided
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      const playerID = params['id'] ? parseInt(params['id'], 10) : 0;
      this.currentPlayerID = playerID;
      this.loadPlayerSummary(playerID);
    });
  }

  loadPlayerSummary(playerID: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    console.log(`🔄 Loading player summary for playerID: ${playerID}`);
    
    this.playersService.getPlayerSummary(playerID).pipe(untilDestroyed(this)).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        console.log('Player Summary Data:', data.apiResponse);
        this.playerSummary = data.apiResponse as PlayerSummary;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading player summary:', error);
        this.errorMessage = error.message || 'Failed to load player data';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Handle player selection change from dropdown
   */
  onPlayerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const playerID = parseInt(selectElement.value, 10);
    
    // Navigate to the new player route
    this.router.navigate(['/player-summary', playerID]);
  }

  ngOnDestroy() {
  }

}