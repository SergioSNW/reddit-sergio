// **** Random Function that gives a random integer between x = Min and y Max
// We calculate the random with the ceiling being Max, add the Min to make
// it so the random falls in the range and floor it to get an integer value.

export default (x, y) => {
  return Math.floor(Math.random() * y) + x;
};
