export function calcMachraJarenArray(beginJaar = 2002): number[] {
  const machraJaren = [];

  // nieuwste jaar gaat pas in als nieuwe sjaarzen zijn ingehamerd, dit gebeurt meestal ergens in oktober
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // als het nog geen oktober is, dan is het year - 1.
  const newestYear = month < 10 ? year - 1 : year;

  for (let jaar = beginJaar; jaar <= newestYear; jaar++) {
    machraJaren.push(jaar);
  }

  return machraJaren;
}
