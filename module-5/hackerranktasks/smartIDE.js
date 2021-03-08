//https://www.hackerrank.com/challenges/ide-identifying-comments/problem

function processData(input) {
    console.log(input.match(/(\/\*.*?\n*\*\/\n?)|(\/\/.*?\n)/gms).join('').replace(/^ +/gm, ''))
 } 