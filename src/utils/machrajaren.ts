export function machraJarenArray(beginJaar = 2002): number[] {
  const machraJaren = [];
  for (let jaar = beginJaar; jaar <= new Date().getFullYear(); jaar++) {
    machraJaren.push(jaar);
  }

  return machraJaren;
}

