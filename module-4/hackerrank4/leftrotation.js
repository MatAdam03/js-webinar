//https://www.hackerrank.com/challenges/array-left-rotation/problem?isFullScreen=true

function rotateLeft(d, arr) {
    
    for(let i =0;i<d;i++){        
        arr.push(arr.shift());
    }
    return arr;
}