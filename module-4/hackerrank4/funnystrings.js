//https://www.hackerrank.com/challenges/funny-string/problem?isFullScreen=true
function funnyString(s) { 
    let oasc = []
    for(let i =0;i<s.length;i++){
        oasc[i]=s.charCodeAt(i);
    }
    let rasc=oasc.slice();
    rasc.reverse();
    for(let j = 0; j < s.length-1;j++){
        let oa=Math.abs(oasc[j]-oasc[j+1]);
        let ra=Math.abs(rasc[j]-rasc[j+1]);
        if(oa!==ra)
        return "Not Funny";
    }
    return "Funny";
   }