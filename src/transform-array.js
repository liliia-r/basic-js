import { NotImplementedError } from "../extensions/index.js";

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let transformedArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "--discard-next") {
      i += 2;
      continue;
    }
    if (arr[i] === "--discard-prev") {
      transformedArr.pop();
      continue;
    }
    if (arr[i] === "--double-next") {
      if (!arr[i + 1]) continue;
      transformedArr.push(arr[i + 1]);
      transformedArr.push(arr[i + 1]);
      i += 1;
      continue;
    }
    if (arr[i] === "--double-prev") {
      if (!arr[i - 1]) continue;
      if (transformedArr[transformedArr.length - 1] === arr[i - 1]) {
        transformedArr.push(arr[i - 1]);
      } else {
        transformedArr.push(arr[i - 1]);
        transformedArr.push(arr[i - 1]);
      }
      continue;
    }
    if (arr[i]) transformedArr.push(arr[i]);
  }
  return transformedArr;
}
