export function shouldStoryBeActive(year_of_story: number) {
  // if year_of_story is within now and 5 years back: true else: false
  const firstHalfOfYear = Number(year_of_story.toString().substring(0, 4));

  if (new Date().getFullYear() - firstHalfOfYear <= 5) {
    return true;
  }

  return false;
}
