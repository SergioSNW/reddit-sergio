// *************** MISCELANEA FUNCTION ******************

// Num is going to be the number that we need to shorten
// While Digits is the amount of digits we want it shorten to.

const shortenNumber = (num, digits) => {
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  for (let i = units.length - 1; i >= 0; i -= 1) {
    const decimal = 1000 ** (i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i];
    }
  }

  return num;
};

export default shortenNumber;
