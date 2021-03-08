/**
 * It reverses the given object, i.e. return a copy of the object 
 * where the keys have become the values and the values the keys
 * 
 * @param {object} o the object
 * @returns {object} the new object
 */

function reverse(o) {
    if (typeof (o) != 'object')
        throw new Error();

    const newO={};
    const key=Object.keys(o);
    const values= Object.values(o);

    for (let i = 0; i < key.length; i++) {      
           newO[values[i]]=key[i];
    }
    
   return newO;
}

module.exports = reverse;