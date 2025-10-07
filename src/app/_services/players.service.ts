import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
// import {plainToClass} from 'class-transformer';

import {BaseService} from './base.service';
import {PlayerSummary} from '../player-summary/player-summary.interface';

/**
 * Response wrapper for player summary endpoint
 */
export interface PlayerSummaryResponse {
  endpoint: string;
  apiResponse: PlayerSummary;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * Retrieves player summary statistics from the API
   * @param playerID - The unique identifier for the player
   * @returns Observable containing the player summary data
   */
  getPlayerSummary(playerID: number): Observable<PlayerSummaryResponse> {
    const endpoint = `${this.baseUrl}/player-summary-api?playerID=${playerID}`;

    return this.get(endpoint).pipe(map(
      (data: Object) => {
          return {
            endpoint: endpoint,
            apiResponse: data as PlayerSummary
          };
      },
      error => {
          return error;
      }
    ));
  }
}