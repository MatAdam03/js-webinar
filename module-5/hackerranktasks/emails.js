//https://www.hackerrank.com/challenges/detect-the-email-addresses/problem
function removeDuplicatesFromArray(array){
    const uniqueSet = new Set(array);
    return result = [...uniqueSet];  
}

function processData(input) {
    const re = /((\w+\.)*\w+@\w+(\.[a-zA-Z]+)+)/g;
    const emails=input.match(re);    
    const result = removeDuplicatesFromArray(emails);     
    console.log(result.sort().join(';'));
}  