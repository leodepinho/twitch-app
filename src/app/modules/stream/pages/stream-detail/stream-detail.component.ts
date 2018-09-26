import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {TwitchService} from '../../../../core/services/twitch.service';
import {Stream} from '../../../../core/models/stream';
import {interval} from 'rxjs';

@Component({
  selector: 'app-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss']
})
export class StreamDetailComponent implements OnInit {

  channelName: string;
  stream: Stream;
  videoUrl: SafeResourceUrl;
  chatUrl: SafeResourceUrl;
  constructor(public route: ActivatedRoute, public sanitizationService: DomSanitizer, private twitchService: TwitchService) {
    this.route.params.subscribe((value) => {
      this.channelName = this.route.snapshot.params['channel_name'];
      this.videoUrl = `https://player.twitch.tv/?channel=${this.channelName}`;
      this.chatUrl = `https://www.twitch.tv/embed/${this.channelName}/chat`;
      this.twitchService.getStreamInfo(this.channelName).subscribe((success => {
        this.stream = success;
        console.log(this.stream);
      }));
    });
  }

  ngOnInit() {
    this.updateStreamInfo(5000);
  }
  updateStreamInfo(time: number) {
    interval(time)
      .subscribe(data => {
        this.twitchService.getStreamInfo(this.channelName).subscribe((success => {
          this.stream = success;
          console.log(this.stream);
        }));
      });
  }

}
