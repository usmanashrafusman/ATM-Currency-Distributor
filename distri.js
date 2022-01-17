let obj = JSON.parse(localStorage.getItem("currency"))
//getting distributed currency obj from localstorage
let append = document.querySelector("#currency"); // getting div element where data will be appended

// looping through an obj
for (const currency in obj){
    //if currency is paid 
    if (obj[currency] !== 0){
        const nameCurreny = document.createElement("p")
        // then append it in div
        nameCurreny.innerText = `${obj[currency]} Notes Of ${currency}`
        append.appendChild(nameCurreny)
    }
}
//removeing obj from localstorage
localStorage.removeItem("currency")