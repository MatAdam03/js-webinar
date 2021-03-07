/**
 * The function returns the nth value of
 * the Fibonacci sequence
 *
 * @param {number} n (n >= 0)
 * @returns {number} Fibonacci number or 0 if any arguments are not proper
 */
function fibonacci(n) {
    let nThFibonacci;
    /*
     * Your task is to calculate the nth value of the
     * Fibonacci sequence.
     * https://en.wikipedia.org/wiki/Fibonacci_number
     * Store the value in the nThFibonacci variable.
     * Also take into consideration the documentation of the function!
     */
    // PLACE YOUR CODE BETWEEN THIS...
    if(n>=0){
        let arr=[0,1]
        for (let index = 0; index < n; index++) {
            const tmp=arr[1]
            arr[1]=arr[0]+arr[1]
            arr[0]=tmp           
        }
        nThFibonacci=arr[0]
    }else{
        nThFibonacci=0;
    }
    
    // ...AND THIS COMMENT LIN
    return nThFibonacci;
}
module.exports = fibonacci;