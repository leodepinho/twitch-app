import { Component, OnInit } from '@angular/core';
import { Stream } from '../../models/stream';
import { TwitchService } from '../../services/twitch.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { StreamRequest } from '../../models/stream-request';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DataMemoryService } from '../../services/data-memory.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
import {Globals} from '../../../util/globals';
import {Navigation} from '../../../util/navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0, transform: 'translateY(-1em)' }),
        animate('100ms 130ms ease-out', style({ opacity: 1 , transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  /**
   * List of searched streams
   */
  streams: Stream[] = [];
  /**
   * Object of query params to get
   * streams from the server
   */
  streamRequest: StreamRequest = new StreamRequest();
  /**
   * FormGroup for filter form
   */
  filtersForm: FormGroup;
  /**
   * Show/Hide search popup
   */
  showSearchPopUp = false;
  /**
   * Show/Hide search bar
   */
  showSearchBar = false;
  /**
   * Subscription to manage changes in the search input
   */
  packages$: Subscription;
  /**
   * Subject assigned to search input
   */
  private searchText$ = new Subject<string>();
  /**
   * Body Tag Element
   */
  mainContainer: HTMLBodyElement;

  constructor(
    private twitchService: TwitchService,
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private memoryService: DataMemoryService,
    ) { }

  ngOnInit() {
    // Get number of results
    this.memoryService.getValue('numberOfResults').then( (results) => {
      if (results) {
        this.streamRequest.limit = parseInt(results, 10);
      } else {
        this.streamRequest.limit = Globals.DEFAULT_NUMBER_OF_RESULTS;
      }
    });
    this.filtersForm = new FormGroup({
      limit: new FormControl(this.streamRequest.limit, [Validators.required, Validators.max(Globals.MAX_NUMBER_OF_RESULTS)]),
    });
    this.mainContainer = document.getElementsByTagName('body')[0];
    // Set subscription for search input
    this.packages$ = this.searchText$.pipe(
      debounceTime(Globals.TYPING_DEBOUNCE_TIME),
      mergeMap(search =>
        this.getStreams()),
    ).subscribe((success) => {
      this.streams = success['streams'];
    });
  }

  /**
   * Update subject value on input event
   * @param query - value of the search input
   */
  getSearchItem(query: string) {
    this.searchText$.next(this.streamRequest.query);
  }

  /**
   * Call Api to get Streams, Show/Hide popup
   */
  getStreams() {
    if (this.streamRequest.query) {
      if (!this.showSearchPopUp) {
        this.showPopUp(true);
      }
      return this.twitchService.searchStreamByParams(this.streamRequest);
    } else {
      this.showPopUp(false);
      return [];
    }
  }

  /**
   * Navigate to stream detail page
   * @param event
   */
  goToDetail(channelName: string) {
    this.router.navigate([Navigation.STREAM_DETAIL_PAGE, channelName]).then( () => {
      this.showPopUp(false);
    });
  }

  /**
   * On Submit filtersForm
   * close modal, save data in memory and make request
   */
  onSubmit() {
    this.ngxSmartModalService.getModal('filtersModal').close();
    this.memoryService.saveData(Globals.MEMORY_NUMBER_OF_RESULTS, this.streamRequest.limit.toString());
    this.getSearchItem(this.streamRequest.query);
  }

  /**
   * Show/Hide search popup,
   * control overflow
   * @param value
   */
  showPopUp(value: boolean) {
    this.showSearchPopUp = value;
    if (this.showSearchPopUp) {
      // @ts-ignore
      this.mainContainer.style = 'overflow: hidden';
    } else {
      // @ts-ignore
      this.mainContainer.style = 'overflow-y: scroll';
    }
  }
  showPrimaryBar(value: boolean) {
    this.showSearchBar = value;
  }
}
