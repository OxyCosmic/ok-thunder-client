import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {PlayersService} from '../_services/players.service';

@UntilDestroy()
@Component({
  selector: 'player-summary-response-component',
  templateUrl: './player-summary-response.component.html',
  styleUrls: ['./player-summary-response.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerSummaryResponseComponent implements OnInit, OnDestroy {

  endpoint: any;
  apiResponse: any;
  playerID: number = 0;
  isLoading: boolean = false;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {

  }

  ngOnInit(): void {
    this.fetchApiResponse();
  }

  changeParams(): void {
    this.fetchApiResponse();
  }

  fetchApiResponse(): void {
    this.isLoading = true;
    console.log(`🔄 Fetching data for playerID: ${this.playerID}`);
    
    this.playersService.getPlayerSummary(this.playerID).pipe(untilDestroyed(this)).subscribe({
      next: (data) => {
        this.endpoint = data.endpoint;
        this.apiResponse = JSON.stringify(data.apiResponse, null, 2);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching player summary:', error);
        this.apiResponse = `Error: ${error.message || 'Failed to load data'}`;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
  }

}