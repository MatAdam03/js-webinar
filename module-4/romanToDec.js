/**
 * It recieves a Roman number (as string)
 * and converts it to it's Arabic (decimal) equivalent.
 *
 * @see https://en.wikipedia.org/wiki/Roman_numerals
 * @param {string} roman
 * @returns {number} the Arabic (decimal) equivalent of the parameter
 * @throws Error in case of invalid input
 */
//module.exports=
function romanToDec(roman) {
    if(typeof(roman)!=="string"){
        throw new Error("Only string input")
    }
    const tableS = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1,
    }
    const tableD = {
        CM: 900,
        CD: 400,
        XC: 90,
        XL: 40,
        IX: 9,
        IV: 4
    }

    let result = 0;

    for (const key in tableD) {
        if (tableD.hasOwnProperty(key)) {
            while (roman.includes(key)) {               
                result += tableD[key];
                roman = roman.replace(key, '')
            }
        }
    }
    for (const key in tableS) {
        if (tableS.hasOwnProperty(key)) {
            while (roman.includes(key)) {                
                result += tableS[key];
                roman = roman.replace(key, '')
            }
        }
    }
    if(roman.length!==0)
    throw new Error("invalid characters in the input")
    return result;
}

console.log(romanToDec("MMMMDXLV")+" equals 4545");
console.log(romanToDec("MMMMMMMMMMMMCCCLII")+" equals 12354");
console.log(romanToDec("MMMMMMMCCCLII")+" equals 7352");
