//https://www.hackerrank.com/challenges/find-a-word/problem

function splitStringByNewLine(input) {
    return input.split(/\n/);
}

function getLinesToSearchIn(input){
    return input.slice(1, +input[0] + 1).join("\n");
}

function getWordsToSearch(input) {
    return input.slice(+input[0] + 2, input.length + 1);
}

function processData(input) {
    const splittedInput = splitStringByNewLine(input);

    const lines = getLinesToSearchIn(splittedInput);
    const words = getWordsToSearch(splittedInput)

    words.forEach(word => {
        var re = new RegExp("\\b" + word + "\\b", "gm");
        const db = lines.match(re);
        console.log(db.length);
    })
} 
