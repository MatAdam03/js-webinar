//https://www.hackerrank.com/challenges/mars-exploration/problem?isFullScreen=true
function marsExploration(s) {
    if(s.length>99 || s.lenth < 1|| s.length%3!==0){
        return 0;
    }
    let count = 0;
    for(let i = 0;i<s.length;i+=3){
        if(s.slice(i,i+1)!="S"){
            count++;
        }    
        if(s.slice(i+1,i+2)!="O"){
            count++;
        }    
        if(s.slice(i+2,i+3)!="S"){
            count++;
        }   
    }
    return count;
    
    
    }
    