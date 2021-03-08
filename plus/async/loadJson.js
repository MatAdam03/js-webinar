/*
 * Rewrite the following code to use async/await 
 */
// module.exports = function loadJson(url) {
//     return fetch(url)
//         .then(response => {
//             if (response.status == 200) {
//                 return response.json();
//             } else {
//                 throw new Error(response.status);
//             }
//         });
// };
module.exports = async function loadJson(url) {
    const fetchresponse= await fetch(url);
    if(fetchresponse.status===200){
       return fetchresponse.json();
    }
    else{
        throw new Error(fetchresponse.status);
    }
};