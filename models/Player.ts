import { Colours } from './Colours.enum';

export class Player {
  score: number;
  colour: Colours;

  constructor() {
    this.score = 0;
  }

  addToScore(score: number) {
    this.score += score;
  }
}
