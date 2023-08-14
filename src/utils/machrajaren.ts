export function calcMachraJarenArray(beginJaar = 2002): number[] {
  const machraJaren = [];
  for (let jaar = beginJaar; jaar <= new Date().getFullYear(); jaar++) {
    machraJaren.push(jaar);
  }

  return machraJaren;
}

export function machraJarenObj() {
  const cachedJaren = (function () {
    const result = calcMachraJarenArray();
    return result;
  })();

  // als machraJarenArr een oneven getal is, gooi er een jaar bij zodat de jaren blijven kloppen.
  if (cachedJaren.length % 2 !== 0) {
    // @ts-ignore .at() does not exsit on TS compiler yet.
    cachedJaren.push(cachedJaren.at(-1) + 1);
  }

  const machraJarenObj: { values: number[]; ui: string[] } = {
    values: [],
    ui: [],
  };

  // create 20172018: number => values
  const { values } = machraJarenObj;
  for (let i = 0; i < cachedJaren.length - 1; i++) {
    const jaarValue = `${cachedJaren[i]}${cachedJaren[i + 1]}`;
    values.push(Number(jaarValue));
  }

  // create 2017/2018: string => UI
  const { ui } = machraJarenObj;
  for (let i = 0; i < values.length; i++) {
    const uiValue = values[i].toString().slice(0, 4) + "/" + values[i].toString().slice(4);
    ui.push(uiValue);
  }

  return machraJarenObj;
}
