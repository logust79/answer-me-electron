// @flow
/* 
math questions of differnet levels
level 1: summations involving two numbers 
  that are both bigger than 10,
  with the sum no bigger than 100
level 2: substration with similar conditions to level 1
*/
import converter from 'number-to-words';
import questionGenerator from '../QuestionGenerator';

type Level = number;
type Answer = string;
export default class MATH implements questionGenerator<Level> {
  level: Level;

  constructor(level: Level) {
    this.level = level;
  }

  static hasher(answer: Answer) {
    // hash the answer to make it invisible
    let hash = 0;

    let i;

    let chr;
    if (answer.length === 0) return hash;
    for (i = 0; i < answer.length; i += 1) {
      chr = answer.charCodeAt(i);
      hash = (hash << 5) - hash + chr; // eslint-disable-line no-bitwise
      hash |= 0; // eslint-disable-line no-bitwise
    }
    return hash.toString();
  }

  generator() {
    let sum = 101;
    let A = 0;
    let B = 0;
    switch (this.level) {
      case 1:
        // sum of two moderately large numbers
        while (sum > 100 || A < 10 || A >= sum || B < 10 || B >= sum) {
          sum = Math.floor(Math.random() * 90 + 11);
          A = Math.floor(Math.random() * 90 + 11);
          B = sum - A;
        }
        return {
          question: `${converter.toWords(A)} + ${converter.toWords(B)}`,
          answer: sum.toString()
        };
      case 2:
        // substraction of two moderately large numbers
        sum = 101;

        A = 0;
        B = 0;
        while (sum > 100 || A < 10 || A >= sum || B < 10 || B >= sum) {
          sum = Math.floor(Math.random() * 90 + 11);
          A = Math.floor(Math.random() * 90 + 11);
          B = sum - A;
        }
        return {
          question: `${converter.toWords(sum)} - ${converter.toWords(B)}`,
          answer: A.toString()
        };
      default:
        return {
          question: 'Password',
          answer: 'apple'
        };
    }
  }
}
