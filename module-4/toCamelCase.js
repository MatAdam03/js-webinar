/**
 * It returns the camel-case version of string.
 * E.g.: simple lowercase string => SimpleLowercaseString
 *
 * @param {string} toConvert
 * @returns {string} camel-case string or empty string in other cases
 */
const allowedchars="abcdefghijklmnopqrstuvwxyz0123456789"

 function toCamelCase(input){

     if(input.length===0 || typeof(input)!=="string")
     return '';



     return input.trim().split(" ")
     .map(word=>{
         return word.split("").filter(c=>{
                return allowedchars.includes(c.toLowerCase());
         }).join("")
     })
     .filter(word=>{return word !==""})
     .map((word,i)=>{
        if(!i){
            return word.toLowerCase();
        } 
        return word[0].toUpperCase()+word.slice(1).toLowerCase();
     })
     .join("")     
 }

 module.exports = toCamelCase;