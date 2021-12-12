export const validateText = (text, setDataText) => {
  let regText = /^[a-zA-Z]+(([. -][a-zA-Z1-9])?[a-zA-Z1-9]*)*$/;
  if (regText.test(text && text.trim()) && text.length >= 2) {
    setDataText(true);
    return true;
  } else {
    setDataText(false);
    return false;
  }
};

export const validateNumber = (number, setDataNumber) => {
  let regNumber = /^[0-9]+$/;
  if (regNumber.test(number)) {
    setDataNumber(true);
    return true;
  } else {
    setDataNumber(false);
    return false;
  }
};
