/**
 * It determines, whether the given two arrays
 * are equal, by considering the number of elements,
 * those order and value, in all levels.
 * 
 * It prints out a message in case of any
 * difference in any array, using console.warn!
 * 
 * @param {Array} first The first array
 * @param {Array} second The second array
 * @returns {boolean} true if the two arrays are equal,
 *                    false otherwise
 */
module.exports = function arrayEqual(first, second) {
    if (first.length !== second.length) {
        console.warn(`Size must be equal first array size is ${first.length} and second array is ${second.length}`);
        return false
    }
    for (let index = 0; index < first.length; index++) {
        if (Array.isArray(first[index])) {
           return arrayEqual(first[index], second[index])
        }

        else if (first[index] !== second[index]) {
            console.warn(`Not equal because first array element at ${index} is ${first[index]} and second array element is ${second[index]}`);
            return false
        }

    }
    return true;
}