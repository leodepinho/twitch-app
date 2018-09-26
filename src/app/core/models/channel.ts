export class Channel {
  display_name: string;
  game: string;
  logo: string;
  status: string;
  followers: number;
  views: number;

  constructor(display_name: string, game: string, logo: string, status: string) {
    this.display_name = display_name;
    this.game = game;
    this.logo = logo;
    this.status = status;
  }
}
