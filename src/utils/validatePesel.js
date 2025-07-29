export function validatePesel(pesel) {
  if (!/^\d{11}$/.test(pesel)) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.split('').map(Number);
  const checksum = digits
    .slice(0, 10)
    .reduce((acc, digit, idx) => acc + digit * weights[idx], 0);

  const controlDigit = (10 - (checksum % 10)) % 10;
  return controlDigit === digits[10];
}