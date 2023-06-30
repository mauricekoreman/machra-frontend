/**
 * Returns a random number between 0 and a maximum number.
 * NOTE: it does not return the maximum number.
 * @param maxNumber A numeric expression
 */
export function randomNumber(maxNumber: number) {
  return Math.floor(Math.random() * maxNumber);
}

