// Creating Arrays in Different Ways

const arr1 = [1, 2, 3, 4, 5, 6]; // easiest way to create an array in JS
console.log(a1); // [1, 2, 3, 4, 5, 6]


// empty array and adding elements/data later when required
const a = [];      // empty
a[0] = 5;          // add later
a[1] = undefined
a[3] = 9;          // creates "holes" at 2 
// Arrays with holes are called sparse array
console.log(a);    // [5, empty × 2, 9]
console.log(a.length); // 4 
console.log(1 in a);   // false, Checks whether an element present in the specific index or not
console.log(3 in a) // true, because there's an element present in 3rd postion
console.log(a.includes(undefined)); // true, no element present at 1,2
console.log(a[2]) //undefined: it returns empty but when we try to access it is undefined
console.log(a[1]) // undefined

// Using Array Constructor we can Create an Array. Creates an [] of length if single element is given

//(A) Single numeric argument → length with holes
const c1 = new Array(3);          // length 3, holes
console.log(c1, c1.length);       // [empty × 3] 3

// (B) Multiple arguments → those values
const arr3 = new Array(7, 8, 9); 
console.log(arr3); // [7, 8, 9]
const a = new Array(undefined)
console.log(a) // [ undefined ]
console.log(a.length) // 1

// (C) Without `new` is the same
const c3 = Array(4);              // [empty × 4]

// (D) Arrayof() - it creates an array even for single element unlike new
const ofa = Array.of(3);       // [3]  ← unlike new Array(3
const arr4 = Array.of(4, 5, 6); // Better than constructor
console.log(arr4); // [4, 5, 6]

const a = Array.of(undefined)
console.log(a) // [ undefined ]

// Other types
const a2 = ['x', 'y', 'z'];              // strings
const a3 = [true, false, true];          // booleans
// Mixed array
const mixedArray = [1, "hello", true, null, { name: "Ram" }, [10, 20], () => "Hi!", undefined];
console.log(mixedArray);

// Accessing elements
console.log(mixedArray[1]);       // "hello"
console.log(mixedArray[2]); // true
console.log(mixedArray[3]); // null: A variable that is assigned empty
console.log(mixedArray[4].name);  // "Ram"
console.log(mixedArray[5][1]);    // 20
console.log(mixedArray[6]);     // "Hi!" (calling the function)
console.log(mixedArray[7]) // undefined: means that variable has been declared but hasn't been assigned anything



// ==============================================================================================================================
/* 
    Mutating Array Methods: Manipulate array memeory Directly. Pass by reference. Original array is changed
    push(), pop(), shift(), unshift(), splice(), sort(), reverse() 
    
*/

const newar = [1, 2, 3];
const alias = newar;   // alias references the same array
newar.push(4);
console.log(alias);   // [1, 2, 3, 4]  ← changed too (same object)
alias.push(5)
console.log(newar) // by making changes in any of the arrays, both of them get changed

/* Conclusion:
   Because arrays are reference types in JavaScript, assigning one array variable to another doesn't create a new, separate array. 
   Instead, both variables act as different "pointers" to the same underlying array object in memory. 

*/

// (1) Push

let ab = [1, 2, 3];
const len = ab.push(4);           // returns new length
console.log(ab, len);             // [1,2,3,4] 4

ab.push(5, 6);                    // push multiple
console.log(ab);                  // [1,2,3,4,5,6]

let b = [];
b.push(1, 'x', true, { id: 1 }, [9], () => 42);
console.log(b); // [1,'x',true,{id:1},[9], f]

// Empty arrays: fine
let c = [];
console.log(c.push()); // 0 (no change)

//(2) Pop

let aa = [1, 2, 3];
const last = aa.pop();           // returns removed element
console.log(last, aa);           // 3 [1,2]

// Empty arrays: returns undefined, no error
let bb = [];
console.log(bb.pop());           // undefined

//(3) Shift

let as = [1, 2, 3];
const first = as.shift();        // returns removed element
console.log(first, as);          // 1 [2,3]

// Empty arrays: returns undefined
let bs = [];
console.log(bs.shift());         // undefined

//(4) Unshift

let au = [2, 3];
const siz = au.unshift(0, 1);  // returns new length
console.log(au, siz);          // [0,1,2,3] 4

//(5) Splice(start, deleteCount?, ...items): Splice returns the deleted elements

// Remove

let ar = [0, 2, 8, 4, 5, 6];
const removed = ar.splice(2, 1);     // remove 1 at index 2

// Insert

let bi = [1, 2, 3];
bi.splice(1, 0, 'X', 'Y');           // insert at index 1
console.log(bi);                     // [1,'X','Y',2,3]

// Replace
let cr = [1, 2, 3, 4];
cr.splice(1, 2, 'A', 'B');           // remove [2,3], insert ['A','B']
console.log(cr);                     // [1,'A','B',4]

// Negative Index

let dn= [1, 2, 3, 4];
// Negative start counts from end: -1 → last element, -2 → second last, etc.
dn.splice(-1, 0, 99);                // insert before last
console.log(dn);                     // [1,2,3,99,4]

// Delete everything afer a certain index

let ed = [1, 2, 3, 4, 5];
ed.splice(2);                        // delete everything from index 2 to end
console.log(ed);

// Mixed array using splice

let fs = [1, { id: 1 }, true];
const out = fs.splice(1, 1, { id: 2 }); // replace object
console.log(out, f);                   // [{id:1}] [1,{id:2},true]

/* (6) Sort: The sort() function allows you to sort an array object by either the default sorting order, or by a custom sorting function.
default way, converts elements into strings and comapres them based on Unicode



*/

const numbers = [9, 3, 12, 11, 40, 28, 5];
console.log(numbers.sort()) // [ 11, 12, 28, 3, 40,  5,  9] // according to unicode 1 comes first that's why 11 here gets first priority

let bss = [6, 5, 4, 8, 2, 0];
bss.sort((x, y) => x - y);     // numeric ascending
console.log(bss);              // [0,2,4,5,6,8]
bss.sort((x, y) => y - x);     // numeric descending
console.log(bss);              // [8,6,5,4,2,0]


// String Sort
const comp = ["alpha", "Gamma", "Beta"]
console.log(comp.sort()) // [ 'Beta', 'Gamma', 'alpha' ] Captial Alphabets get first priority


let s = ['b', 'A', 'a'];
s.sort();                              // ["A","a","b"] (uppercase first)
console.log(s);


// check if sorting with different data types - string, boolean, combination of both






arr1.reverse();
console.log(arr1); // [6, 5, 4, 8, 2, 0]

// =========================================================================================================================
/* 
    Non-Mutating Array Methods: Returns a new array. Pass by value
    spread operator, map(), filter(), reduce(), slice(), concat()
    explore different datatypes for every method all variations
*/

const arr6 = [...arr1]; // we can concatenate multiple arrays using multiple spread functions
console.log(arr6); // [6, 5, 4, 8, 2, 0]

const arr7 = arr1.map(num => num * 2); // transform each element in the array with the help of a function and return a new array
console.log(arr7); // [12, 10, 8, 16, 4, 0]

const arr8 = arr1.filter(num => num % 2 === 0); // returns a new array with check condition. keeps true elements
console.log(arr8); // [6, 4, 8, 2, 0]

const total = arr1.reduce((acc, num) => acc + num, 0); // uses an accumulator and parses the array from left to right
console.log(total); // 25

const arr9 = arr1.slice(1, 4); // slices array from a till b excluding b.
console.log(arr9); // [5, 4, 8]

const arr10 = arr1.concat(arr7); // combines two arrays into a new array
console.log(arr10); // [6, 5, 4, 8, 2, 0, 12, 10, 8, 16, 4, 0]

// =========================================================================================================================
/* 
    Converting Data Types
*/

const str = arr1.join(', '); // array to string using join
console.log(str); // "6, 5, 4, 8, 2, 0"

const str2 = "1,2,3,4,5";
const arr11 = str2.split(','); // string to array using split
console.log(arr11); // ["1", "2", "3", "4", "5"]

// =========================================================================================================================
/* 
    Converting Array to Object and vice versa
*/

const obj1 = Object.fromEntries([
  ['name', 'Ram'],
  ['age', 22],
  ['city', 'Hyderabad']
]);
console.log(obj1); // {name: "Ram", age: 22, city: "Hyderabad"} //  converts key value pair arrays to an object

const arr12 = Object.entries(obj1); // converts object to array with key value pair arrays
console.log(arr12); // [["name", "Ram"], ["age", 22], ["city", "Hyderabad"]]


// string to boolean, number to string, differnt manipulations
// =========================================================================================================================
// Creating Objects in Different Ways

const emp1 = { name: "Ram", age: 25, city: "Hyderabad" }; // easy way to create an object from entries
console.log(emp1); // { name: "Ram", age: 25, city: "Hyderabad" }

const emp2 = new Object({ name: "Rahul", age: 28, city: "Bangalore" }); // creating an object using Object constructor
console.log(emp2); // { name: "Rahul", age: 28, city: "Bangalore" }

const emp3 = Object.create({ company: "TCS" }); // creates a new object from parent object(inherits from main or parent object)
emp3.name = "Rohith";
emp3.age = 27;
console.log(emp3); // { name: "Rohith", age: 27 }

const emp4 = {}; // empty object assigning the entries later
emp4.name = "Aakash";
emp4.age = 30;
console.log(emp4); // { name: "Aakash", age: 30 }

// =========================================================================================================================
// CRUD Operations on Objects

const emp = { name: "Kalyan", age: 24, department: "IT" };
console.log(emp); // { name: "Kalyan", age: 24, department: "IT" }

console.log(emp.name); // Kalyan

emp.department = "HR";
console.log(emp); // { name: "Kalyan", age: 24, department: "HR" }

delete emp.age;
console.log(emp); // { name: "Kalyan", department: "HR" }
// pass by value and reference

//========================================================================================================================
// Accessing object data in different ways

console.log(emp.age) // using .
console.log(emp["name"]) // using bracket notation
console.log(emp[key]) // accessing symbols using brackets
console.log(emp.address.city) // accessing nested objects
console.log(emp["address"]["city"]) // accessing nested objects using brackets
console.log(emp?.adress?.pincode) // check before accessing deeply nested objects
// addition of a new key to e
// =========================================================================================================================
// Object Methods

const empDetails = {
  name: "Rakesh",
  age: 26,
  city: "Chennai",
};

console.log(Object.keys(empDetails)); // ["name", "age", "city"] // returns all the keys present inside an object
console.log(Object.values(empDetails)); // ["Rakesh", 26, "Chennai"] // returns all the values present inside an object
console.log(Object.entries(empDetails)); // [["name", "Rakesh"], ["age", 26], ["city", "Chennai"]]

const newEmp = Object.assign({}, empDetails, { department: "Finance" });
console.log(newEmp); // { name: "Rakesh", age: 26, city: "Chennai", department: "Finance" }

const clonedEmp = { ...empDetails };
console.log(clonedEmp); // { name: "Rakesh", age: 26, city: "Chennai" }

// =========================================================================================================================
// Example: Employee Management

const employees = [
  { name: "Sai", age: 25, salary: 40000 },
  { name: "Kiran", age: 28, salary: 50000 },
];

console.log(employees);
// [{ name: "Sai", age: 25, salary: 40000 }, { name: "Kiran", age: 28, salary: 50000 }]

employees.push({ name: "Ram", age: 30, salary: 60000 });
console.log(employees);
// [{ name: "Sai", age: 25, salary: 40000 }, { name: "Kiran", age: 28, salary: 50000 }, { name: "Ram", age: 30, salary: 60000 }]

employees[1].salary = 55000;
console.log(employees);
// [{ name: "Sai", age: 25, salary: 40000 }, { name: "Kiran", age: 28, salary: 55000 }, { name: "Ram", age: 30, salary: 60000 }]

employees.pop();
console.log(employees);
// [{ name: "Sai", age: 25, salary: 40000 }, { name: "Kiran", age: 28, salary: 55000 }]

// singleton vs dynamic retrival in array, object, combination of array of objects, different datatypes
// pass by value, pass by reference in objects