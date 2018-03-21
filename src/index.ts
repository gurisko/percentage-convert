interface IConvertOptions {
  favorLarge?: boolean;
  respectTie?: boolean;
}

export function convert(input: number[], places: number = 0, options: IConvertOptions = {}) {
  const {favorLarge, respectTie} = Object.assign({favorLarge: true, respectTie: false}, options);
  const multiplier = 10 ** places;

  if (places < 0 || Math.floor(places) !== places) {
    throw new Error('Invalid number of decimal places');
  }

  const sum = input.reduce((aggr, curr) => aggr + curr, 0);
  const percentageRaw = input.map(curr => 100 * curr / sum);
  const percentageRounded = percentageRaw.map(curr => Math.floor(curr * multiplier) / multiplier);

  const missing = 100 * multiplier - Math.floor(100 * percentageRounded.reduce((aggr, curr) => aggr + curr, 0));
  if (missing === 0) {
    return percentageRounded;
  }

  const priority = percentageRaw
    .map((curr, index) => ({index, value: curr - percentageRounded[index]}))
    .sort(favorLarge ? (a, b) => b.value - a.value : (a, b) => a.value - b.value);

  if (respectTie) {
    const addingMap: {[k: string]: number} = {};
    const occurrenceMap: {[k: string]: number} = input.reduce((aggr: {[k: string]: number}, curr) => ({...aggr, [curr]: aggr.hasOwnProperty(curr) ? aggr[curr] + 1 : 1}), {});

    let i = 0;
    let added = 0;
    while (added < missing && i < input.length) {
      const {index} = priority[i];
      const number = input[index];

      if (!addingMap.hasOwnProperty(number)) {
        addingMap[number] = Math.floor((missing - added) / occurrenceMap[number]);
      }
      const toAdd = addingMap[number];
      if (toAdd > 0) {
        percentageRounded[index] = Math.round(percentageRounded[index] * multiplier + toAdd) / multiplier;
        added += toAdd;
      }
      i += 1;
    }
    return percentageRounded;
  }
  for (let i = 0; i < missing; i += 1) {
    const {index} = priority[i];
    percentageRounded[index] = Math.round(percentageRounded[index] * multiplier + 1) / multiplier;
  }

  return percentageRounded;
}
