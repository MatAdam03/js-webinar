/**
 * It deletes the given property of the given object
 * and returns the new object.
 * The function must not modify the original object!
 * 
 * @param {object} o the object
 * @param {string} key the name of the property to delete
 * @returns {object} the new object without the given property
 */

function del(o, b) {
   if (typeof (o) != 'object') {
      throw new Error();
   }
   const newO ={}
   Object.assign(newO,o);
   delete newO[b];
   return newO;
}

module.exports = del;