/**
 * It wait for the given seconds, but at most 10 seconds.
 *
 * @param {number} sec the seconds to wait
 * @returns {Promise} the promise which resolves when wait if over
 *                    or rejects if parameter is not correct
 */
module.exports = async function sleep(sec) {
    await new Promise((resolve, reject) => {        
        if(typeof(sec)!=="number"){
            reject('NaN')
        }
        if(sec>10){sec=10}
        setTimeout(() => resolve("done!"), 1000*sec)
      });
};