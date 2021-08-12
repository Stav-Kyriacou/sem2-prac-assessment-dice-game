import { Sides } from './Sides.enum';

export class Die {
  numSides: Sides;

  constructor() {
    this.numSides = 6;
  }
  roll() {
    return Math.floor(Math.random() * this.numSides) + 1;
  }
}