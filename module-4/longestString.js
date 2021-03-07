/**
 * It recieves an array of strings and returns
 * the first longest string from it.
 * Also in the alphabetically first in case of more.
 *
 * @param {Array.<string>} strings
 * @returns {string} longest string or empty string in other cases
 */

module.exports = function longestString(strings) {
    if (!Array.isArray(strings)) {
        return '';
    }
    let longest = '';
    strings.forEach(element => {
        if (typeof (element) === "string") {
            if (longest.length < element.length) {
                longest = element;
            }
            if (longest.length === element.length) {
                if (longest > element) {
                    longest = element;
                }
            }

        }
    });

    return longest;

}