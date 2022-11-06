import { greetings } from "./greetings.ts";

/**
 * Returns a personalised greeting.
 *
 * @param name Name of the person
 * @returns Personalised greeting
 */
export function greet(name: string) {
  const index = Math.floor(Math.random() * greetings.length);

  return `${greetings[index]}, ${name}!`;
}
