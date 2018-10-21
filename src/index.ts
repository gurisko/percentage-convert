function sum(arr: number[]) {
  return arr.reduce((sum, elem) => sum + elem, 0);
}

export function convert(input: number[] = [], places: number = 0): string[] {
  const multiplier = 10 ** places;
  const pad = '0'.repeat(places);

  if (!Array.isArray(input) || input.length === 0) {
    throw new Error('No number passed');
  }

  if (places < 0 || Math.floor(places) !== places) {
    throw new Error('Invalid number of decimal places');
  }

  const inputSum = sum(input);
  const percentage = input.map(curr => Math.round(100 * multiplier * curr / inputSum));
  let missing = multiplier * 100 - sum(percentage);

  const internal = percentage.map((v, index) => ({
    index,
    decimal: Math.floor(v / multiplier),
    fractional: v % multiplier,
  })).sort((a, b) => b.fractional - a.fractional);

  let index = 0;
  while (missing !== 0) {
    const operation = missing > 0 ? 1 : -1;
    internal[index].fractional = internal[index].fractional + operation;
    missing = missing - operation;
    index = !internal[index + 1].fractional ? 0 : index + 1;
  }

  return internal
    .sort((a, b) => a.index - b.index)
    .map(v => {
      const fractionalStr = v.fractional.toString();
      return `${v.decimal}.${pad.substring(fractionalStr.length)}${fractionalStr}`;
    });
}
