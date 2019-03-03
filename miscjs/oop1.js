//Trying out OO concepts in JS
//Code here is based on https://medium.freecodecamp.org/an-introduction-to-object-oriented-programming-in-javascript-8900124e316a


//Non OOP Code:
var bread = {name: 'Bread', price: 1}
var water = {name: 'Water', price: 0.25}

var basket = []
basket.push(bread)
basket.push(bread)
basket.push(water)
basket.push(water)
basket.push(water)

var total = basket
    .map(product => product.price)
    .reduce((a,b)=> a + b, 0)

console.log('Total cost: ' + total)


//OOP version of previous code:
var bread = new Product('bread', 1)
var water = new Product('water', .25)
var basket = new Basket()

basket.addProduct(2, bread)
basket.addProduct(3, water)
basket.printShoppingInfo()

function Product(_name, _price){
    const name = _name
    const price = _price


    this.getName = function(){
        return name
    }

    this.getPrice = function(){
        return price
    }
}

function Basket() {
    const products = []

    this.addProduct = function(amount, product) {
        products.push(...Array(amount).fill(product))
    }
    this.calcTotal = function() {
        return products
            .map(product => product.getPrice())
            .reduce((a,b) => a + b, 0)
    }

    this.printShoppingInfo = function() {
        console.log('Total cost: ' + this.calcTotal())
    }
}

//Inheritance:
function Book(_name, _price, _author){
    Product.call(this, _name, _price)
    const author = _author

    this.getAuthor = function(){
        return author
    }
}

const book = new Book('faust', 12.5, 'Goethe')
basket.addProduct(1, book)

console.log(book.getName()+ ' was written by ' + book.getAuthor()) 

//Using ES6 class keyword

class Animal {
    constructor(_name){
        this.name = _name
    }
}

class Dog extends Animal{
    constructor(_name, _race){
        super(_name)
        this.race = _race
    }
}

const dog = new Dog('fido', 'pitbul')
console.log(dog.name + ' is a ' + dog.race)


