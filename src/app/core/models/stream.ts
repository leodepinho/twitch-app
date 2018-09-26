import {Preview} from './preview';
import {Channel} from './channel';

export class Stream {
  game: string;
  stream_type: string;
  video_height: number;
  viewers: number;
  preview: Preview;
  channel: Channel;

  constructor(game: string, stream_type: string, video_height: number, viewers?: number, preview?: Preview, channel?: Channel) {
    this.game = game;
    this.stream_type = stream_type;
    this.video_height = video_height;
    this.viewers = viewers;
    this.preview = preview;
    this.channel = channel;
  }
}
