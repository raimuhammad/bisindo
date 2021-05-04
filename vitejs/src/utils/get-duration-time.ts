export function getDurationTime(n: number) {
  let current = n;
  let count = 0;
  while (current >= 60) {
    count += 1;
    current -= 60;
  }
  const modulo = n % 60;
  return { minute: count, modulo };
}
export function getDurationTimeText(n: number) {
  const { minute, modulo } = getDurationTime(n);
  const minuteText = minute < 10 ? `0${minute}` : `${minute}`;
  const secondText = modulo < 10 ? `0${modulo}` : `${modulo}`;
  return `${minuteText}:${secondText}`;
}
