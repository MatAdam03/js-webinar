const arrayEqual = require("./arrayEqual");

/**
 * It determines, whether the given array is sorted in
 * alphabetically ascending order.
 * 
 * It ignores
 *  - case of the character
 *  - given special characters (nothing by default)
 *  - whitespaces
 * 
 * @param {string[]} items the subject items
 * @param {string} ignore characters to ignore
 * @returns {boolean} true if the array is properly sorted,
 *                    false otherwise
 */
function sorter(array) {
    array.sort();
    for (let index = 0; index < array.length; index++) {
        if (Array.isArray(array[index])) {
            sorter(array[index]);
        }
    }
    return array;
}
function ignoreReplacer(array, ignore) {
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            ignoreReplacer(array, ignore);
        }
        else {
            for (let j = 0; j < ignore.length; j++) {
                if (typeof (array[i]) === "string") {                    
                        array[i]=array[i].split(ignore[j]).join('');                    
                }
            }
        }
    }
    return array;
}

module.exports = function arraySorted(items, ignore) {
    if (ignore) {
        ignore = ignore.split('')
        ignoreReplacer(items, ignore);
    }
    for (let index = 0; index < items.length; index++) {
        if (typeof (items[index]) === "string") {            
            items[index] = items[index].split(" ").join("").toLowerCase();
        }
    }
    let tmp = items.slice();
    tmp = sorter(tmp);
    for (let index = 0; index < tmp.length; index++) {
        if (tmp[index] != items[index]) {           
            return false;
        }
    }
    return true;
}