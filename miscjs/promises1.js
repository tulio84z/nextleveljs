//Promises tutorial based on https://scotch.io/tutorials/javascript-promises-for-dummies

//ES5:
var isMomHappy = true

// Promise
var willIgetNewPhone = new Promise(
    function(resolve, reject){
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            }
            resolve(phone) //fulfilled
        } else {
            var reason = new Error('mom is not happy')
            reject(reason) // rejected
        }
    }
)

// call our promise
var askMom = function() {
    willIgetNewPhone
        .then(function(fulfilled){
            // yay, you got a new phone
            console.log(fulfilled) //output: {brand: samsung, color: black}
            
        })
        .catch(function(error){
            // oops, you are not getting a new phone
            console.log(error.message) // output: mom is not happy
            
        })
}

askMom()

//Chaining Promises:

//2nd promise
var showOff = function (phone) {
    return new Promise(
        function (resolve, reject){

            var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone'
            
            resolve(message)
        }
    )
}

/*
// A shorter was of writing the previous code

var showOff = function (phone) {
    var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

    return Promise.resolve(message);
};

*/


var askMom = function() {
    willIgetNewPhone
        .then(showOff)
        .then(function (fulfilled){
            console.log(fulfilled) // output: hey friend, I have a new black Samsung phone
        })
        .catch(function (error){
            console.log(error.message)
        })

}

askMom()

//ES6
var isMomHappy = true

//Promise
var willIgetNewPhone = new Promise(
    (resolve, reject) => {
        if (isMomHappy) {
            const phone = {
                brand: 'Samsung',
                color: 'black'
            }
            resolve(phone)
        } else {
            const reason = new Error('mom is not happy')
            reject(reason)
        }
    }
)

var showOff = function(phone) {
    const message = 'Hey friend, I have a new ' +
                        phone.color + ' ' + phone.brand + ' phone'

    return Promise.resolve(message)
}

var askMom = function() {
    willIgetNewPhone
        .then(showOff)
        .then(fulfilled => console.log(fulfilled))
        .catch(error => console.log(error.message))
}
askMom()

//ES7

var isMomHappy = true

var willIgetNewPhone = new Promise(
    (resolve, reject) => {
        if(isMomHappy){
            const phone = {
                brand: 'Samsung',
                color: 'black'
            }
            resolve(phone)
        }else {
            const reason = new Error ('mom is not happy')
            reject(reason)
        }
    }
)

//2nd promise
async function showOff(phone) {
    return new Promise(
        (resolve, reject) => {
            var message = 'Hey friend, I have a new ' +
                            phone.color + ' ' + phone.brand + ' phone'
            resolve(message)
        }
    )
}

//call our promise
async function askMom2(){
    try {
        console.log('before asking mom2')
        let phone = await willIgetNewPhone
        let message = await showOff(phone)

        console.log(message)
        console.log('after asking mom2')
    } catch (error) {
        console.log(error.message)
    }
}
(async () => {
    await askMom2()
})()

