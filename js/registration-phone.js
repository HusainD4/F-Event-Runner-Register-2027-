export function isValidRegistrationPhone(value) {
  return /^(?:\+?62|0)8\d+$/.test(value)
    && value.replace(/^\+/, '').length >= 10
    && value.replace(/^\+/, '').length <= 13;
}

export function limitRegistrationPhoneLength(input) {
  const updateLimit = () => {
    input.maxLength = !input.value || input.value.startsWith('+') ? 14 : 13;
  };
  updateLimit();
  input.addEventListener('input', updateLimit);
}
