/* define a question generator */

export interface QuestionGenerator {
  level: number;
  generator(): { question: string, answer: string };
  haser(): string;
}
