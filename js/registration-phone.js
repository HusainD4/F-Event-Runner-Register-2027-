export function isValidRegistrationPhone(value) {
  return /^\+628\d{7,11}$/.test(value);
}

export function setupRegistrationPhone(input) {
  input.maxLength = 15;
  input.addEventListener('input', () => {
    if (input.value.startsWith('08')) {
      input.value = '+628' + input.value.slice(2);
    } else if (input.value.startsWith('628')) {
      input.value = '+' + input.value;
    }
  });
}
