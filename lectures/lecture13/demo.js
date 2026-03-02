let arr = ["apple", "orange", "banana"];

const logItem1 = (item) => console.log(item);
const logItem2 = (item, idx) => console.log(item, idx);
const logItem3 = (item, idx, arr) => console.log(item, idx, arr);

arr.forEach(logItem3);
