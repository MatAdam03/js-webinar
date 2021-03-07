
//https://www.hackerrank.com/challenges/crush/problem?isFullScreen=true
function arrayManipulation(n, queries) {
    if(n<3||n>1e7||queries.length<1||queries.length>2*(1e5))
    return 0;
    let myArray=new Array(n+1).fill(0);     
    for(let i = 0 ; i < queries.length;i++){  
        if(queries[i][0]<1 || queries[i][0]>queries[i][1]|| queries[i][1]>n||queries[i][2]<0||queries[i][2]>1e9)
        return 0;       
        myArray[queries[i][0]-1]+=queries[i][2];
        myArray[queries[i][1]]-=queries[i][2];         
    }    
    let max = myArray[0];
    for(let i = 1 ; i < myArray.length;i++){                
        myArray[i]=myArray[i]+myArray[i-1];
        if(myArray[i]>max)
        max=myArray[i];        
    }      
    return max;
}