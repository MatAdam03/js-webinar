/**
 * It recieves an array of strings, integers and
 * array like itself.
 * Return the summary of all integers in it on * any level.
 *
 * @param {Array} elements
 * @returns {number} summary of all integers or 0 in other cases
 */

 module.exports=function arraySum(elements){
    if(!Array.isArray(elements)){
        return 0;
    }
    let k = 0;
    elements.flat(Infinity).forEach(element => {
        if(typeof(element)==="number"){           
            k+=element;
        }
    });
   return k;
 }