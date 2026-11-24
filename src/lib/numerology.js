// Výpočet čísla životní cesty z data narození. Čistá funkce, sdílená webem i aplikací.
const MASTER = [11, 22, 33];

const digitSum = n => String(n).split('').reduce((s, d) => s + Number(d), 0);

/** @returns {{ steps: number[], digits: number[], result: number }} */
export function lifePathNumber(day, month, year) {
  const digits = `${day}${month}${year}`.split('').map(Number);
  let n = digits.reduce((a, b) => a + b, 0);
  const steps = [n];
  while (n > 9 && !MASTER.includes(n)) {
    n = digitSum(n);
    steps.push(n);
  }
  return { digits, steps, result: n };
}
