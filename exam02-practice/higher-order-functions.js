const fruitList = [
    {
        name: "apple",
        color: "red"
    },
    {
        name: "raspberry",
        color: "red"
    },
    {
        name: "orange",
        color: "orange"
    },
    {
        name: "banana",
        color: "yellow"
    },
    {
        name: "grape",
        color: "green"
    }
];

console.log(fruitList);

function doSomethingToEveryItem(item) {
    console.log(`${item.name} - ${item.color}`);
};

function goodMapCallbackFunction(item) {
    return `<section> style="background:${item.color}
        
    </section?`
};

// const result = fruitList.forEach(doSomethingToEveryItem);
// console.log(result)

// const result = fruitList.map(goodMapCallbackFunction);
// console.log(result);

// function redOnly(item) {
//     return item.color.toLowerCase() === "red";
// };

const redOnly = item => item.color.toLowerCase() === "red";

const redFruitHTML = fruitList.filter(redOnly).map(toHTML);
console.log(redFruitHTML);

const onlyreds = fruitList.filter(redOnly);
const htmlsnippets = fruitList.map(toHTML);
const containerEl = document.querySelector('#fruit-container');

// htmlsnippets.forEach(snip => containerEl.insertAdjacentHTML('beforeend', snip));
// containerEl.innerHTML = htmlsnippets.join("");