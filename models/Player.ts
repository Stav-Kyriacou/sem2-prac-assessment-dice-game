import { Colours } from './Colours.enum';

export class Player {
  score: number;
  colour: Colours;

  constructor(colour: Colours) {
    this.score = 0;
    this.colour = colour;
  }

  addToScore(score: number) {
    this.score += score;
  }
}
