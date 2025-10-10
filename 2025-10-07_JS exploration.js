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

// Numeric comparator (for numbers stored as numbers)
let bss = [6, 5, 4, 8, 2, 0];
bss.sort((x, y) => x - y);     // numeric ascending
console.log(bss);              // [0,2,4,5,6,8]
bss.sort((x, y) => y - x);     // numeric descending
console.log(bss);              // [8,6,5,4,2,0]

// String Sort
const comp = ["alpha", "Gamma", "Beta"]
console.log(comp.sort()) // [ 'Beta', 'Gamma', 'alpha' ] Captial Alphabets get first priority


let s = ['b', 'A', 'a'];
s.sort();     // ["A","a","b"] (uppercase first)
console.log(s);

// Case-insensitive string comparator
const s2 = ["alpha", "Gamma", "Beta"];
console.log(s2.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))); // [ 'alpha', 'Beta', 'Gamma' ]

// check if sorting with different data types - string, boolean, combination of both
// Default sort with booleans (they are stringified: "true"/"false")
const b1 = [true, false, true];
console.log(b1.sort()); // [ false, true, true ]

const b12 = [true, false, true, "floor", "toy"];
console.log(b12.sort()); // [ false, 'floor', 'toy', true, true ] - mixed array always behaves unpredictably if not specified

// Mixed types comparator: compare by lower-cased string representation
const mix3 = ["apple", true, "Banana", false];
console.log(
  mix3.sort((a, b) => String(a).toLowerCase().localeCompare(String(b).toLowerCase()))
); // [ 'apple', 'Banana', false, true ]

// Boolean numeric sort (false -> 0, true -> 1)
const b2 = [true, false, true, false];
console.log(b2.sort((a, b) => Number(a) - Number(b))); // [ false, false, true, true ]
// sorting objects
const books = [
  { title: "Book C", year: 2010 },
  { title: "Book B", year: 2005 },
  { title: "Book A", year: 2018 },
];

// Sort by title ignoring the word "Book "
const booksSortedByTitle = books.sort((a, b) => {
  const nameA = a.title.replace("Book ", "").trim();
  const nameB = b.title.replace("Book ", "").trim();
  return nameA.localeCompare(nameB); // alphabetical A → Z
});

console.log(booksSortedByTitle);

// Trying to sort a mixed array using custom priority based comparator

const priority = { // lower number highest priority
  number: 1,
  string: 2,
  boolean: 3,
  null: 4,
  undefined: 5,
  array: 6,
  object: 7,
  function: 8
};

const byPriority = [...mixedArray].sort((a, b) => { // creating a shallow copy so that original array stays the same
  const ta = typeOfValue(a);
  const tb = typeOfValue(b);
  const pa = priority[ta] ?? 999;
  const pb = priority[tb] ?? 999;
  if (pa !== pb) return pa - pb;
  // same priority means fallback to stable string compare
  return String(a).localeCompare(String(b));
});

console.log(byPriority);
// [1, "hello", true, null, undefined, [10, 20], { name: "Ram" }, () => "Hi!"]


// Reverse
// Number reverse
const x = [10, 20, 30];
const returned = x.reverse();
console.log(x === returned); // true
console.log(returned); // [30, 20, 10]

// Simple mixed array reverse by just flipping their positions
const mixed = [1, "hello", true, null, { name: "Ram" }, [10,20], () => "Hi", undefined];
mixed.reverse();
console.log(mixed);
// [ undefined, () => "Hi", [10,20], { name: "Ram" }, null, true, "hello", 1 ]

// Reverse after numeric sort() to get descending order
const nums = [9, 3, 12, 11, 40];
nums.sort((a,b) => a - b); // ascending
console.log(nums); // [3, 9, 11, 12, 40]
nums.reverse(); 
console.log(nums); // [40, 12, 11, 9, 3]


//Reverse a string (characters or words)
const sr = "Ram Rahul Rohith";
// reverse characters
console.log(sr.split("").reverse().join("")); // "htih oR lua haR maR"

// reverse words
console.log(sr.split(" ").reverse().join(" ")); // "Rohith Rahul Ram"

// empty & single-element arrays

console.log([].reverse());       // []
console.log([42].reverse());    // [42]


//sparse array reverse including holes

const sparse = [];
sparse[0] = "Ram";
sparse[2] = "Rahul";
// ["Ram", <1 empty item>, "Rahul"]
sparse.reverse();
console.log(sparse); // ["Rahul", <1 empty item>, "Ram"]

// =========================================================================================================================
/* 
    Non-Mutating Array Methods: Returns a new array. Pass by value
    spread operator, map(), filter(), reduce(), slice(), concat()
    explore different datatypes for every method all variations
*/
//-------------------------------------------------Spread Operator(Shallow Copy)
// simple shallow copy
const copy = [...arr1];
console.log(copy); // [6, 5, 4, 8, 2, 0]

// concat multiple arrays + values using spread
const extra = [9, 10];
const merged = [...arr1, ...extra, -1, "end"];
console.log(merged); // [6, 5, 4, 8, 2, 0, 9, 10, -1, "end"]

// spread a string into characters inside an array
const chars = [..."Ram"];
console.log(chars); // ["R", "a", "m"]

// shallow copy (objects inside arrays keep same reference)
const nested = [{ name: "Ram" }, { name: "Rahul" }];
const shallowCopy = [...nested];
shallowCopy[0].name = "RAM*";
console.log(nested); // [{ name: "RAM*" }, { name: "Rahul" }]

/*-------------------- filter() — keep elements that match a predicate 
Returns new array with elements for which predicate returns truthy.
Works well to select by type, property or condition. */

// numbers → keep evens
const evens = arr1.filter(n => n % 2 === 0);
console.log(evens); // [6, 4, 8, 2, 0]

// strings that only keep those with length > 3
const longWords = ["Ram", "Rahul", "Kiran"].filter(s => s.length > 3);
console.log(longWords); // ["Rahul", "Kiran"]

// objects to filter by property
const people = [{name:"Ram", age:25}, {name:"Kiran", age:30}];
const above26 = people.filter(p => p.age > 26);
console.log(above26); // [{name:"Kiran", age:30}]

// mixed to keeping only primitives (no objects/arrays/functions)
const mixed2 = [1, "a", {x:1}, [2], () => {}, null, undefined];
const primitives = mixed2.filter(v => (v !== Object(v))); // simple test: primitives satisfy v !== Object(v)
console.log(primitives); // [1, "a", null, undefined]

// Map--------------------------------------------------------------------

// numbers → double
const doubled = arr1.map(n => n * 2);
console.log(doubled); // [12, 10, 8, 16, 4, 0]

// strings → lengths
const words = ["Ram", "Rahul", "Kiran"];
const lens = words.map(s => s.length);
console.log(lens); // [3, 5, 5]

// objects → map to a new object (immutably)
const objs = [{ x:1 }, { x:2 }];
const incremented = objs.map(o => ({ ...o, x: o.x + 1 }));
console.log(incremented); // [{ x: 2 }, { x: 3 }]
console.log(objs); // [{ x: 1 }, { x: 2 }]  -- original unchanged

// mixed types → demonstrate safe mapping
const mixeda = [1, "hi", true, {n:"Ram"}, [10]];
const mappedMixed = mixeda.map(v => {
  if (typeof v === "number") return v + 1;
  if (typeof v === "string") return v.toUpperCase();
  if (Array.isArray(v)) return v.length;
  if (typeof v === "object") return Object.keys(v);
  return v;
});
console.log(mappedMixed); // [2, "HI", true, ["n"], 1]

// Reduce ---------------------------------------------------------------------------------

// Sum of numbers
const arrr1 = [1, 2, 3, 4];
const sum = arr1.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10


// Find maximum value
const arr2 = [5, 2, 9, 1];
const max = arr2.reduce((acc, num) => (num > acc ? num : acc));
console.log(max); // 9


//  Combine strings
const worrds = ["Ram", "is", "learning"];
const sentence = worrds.reduce((acc, word) => acc + " " + word);
console.log(sentence); // "Ram is learning"


// Flatten simple nested array
const nedsted = [[1, 2], [3, 4], [5]];
const flat = nedsted.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // [1, 2, 3, 4, 5]


// Count even numbers
const arrr3 = [2, 5, 6, 7, 8];
const evenCount = arr3.reduce((acc, num) => (num % 2 === 0 ? acc + 1 : acc), 0);
console.log(evenCount); // 3


// Mix of numbers + strings 
const mixxed = [1, "2", 3, "4"];
const sumMixed = mixed.reduce((acc, val) => acc + Number(val), 0);
console.log(sumMixed); // 10

//-----------------------------------------------------------------------------Slice
const s1 = arr1.slice(1, 4); 
console.log(s1); // [5, 4, 8]

const mixed3 = [1, {n:"Ram"}, [10], "end"];
console.log(mixed3.slice(0, 2)); // [1, {n: "Ram"}]

// slice with negative indices
console.log(arr1.slice(-3)); // [8, 2, 0]

// slice on empty returns []
console.log([].slice(0, 2)); // []

//----------------------------------------Concat
const c12 = arr1.concat([9, 10]);
console.log(c12); // [6, 5, 4, 8, 2, 0, 9, 10]

// concat individual values
const c2 = arr1.concat("end", 99);
console.log(c2); // [6, 5, 4, 8, 2, 0, "end", 99]

// concat nested arrays does NOT deep flatten beyond one level
const nested2 = [1, [2, [3]]];
console.log(nested2.concat([4, [5]])); // [1, [2, [3]], 4, [5]]

// similar effect using spread
console.log([...arr1, ...[9,10], "end"]); // [6,5,4,8,2,0,9,10,"end"]


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


// Different Datatype manipulation inside Array and Object
// =========================================================================================================================

// Convert array elements to different types
const mixedArr = ["10", "20", "30", true, false, "100"];

// Convert all to Numbers
const numArr = mixedArr.map(x => Number(x));
console.log(numArr); // [10, 20, 30, 1, 0, 100]

// Convert all to Strings
const strArr = mixedArr.map(x => String(x));
console.log(strArr); // ["10", "20", "30", "true", "false", "100"]

// Convert all to Booleans
const boolArr = mixedArr.map(x => Boolean(x));
console.log(boolArr); // [true, true, true, true, false, true]


// =========================================================================================================================
// Type conversion inside an object
const emp = {
  name: "Ram",
  age: "25",
  active: "true",
  salary: "45000",
};

// Convert selected fields to their actual data types
emp.age = Number(emp.age);
emp.active = emp.active === "true"; // converts string "true" → boolean true
emp.salary = Number(emp.salary);

console.log(emp); // { name: "Ram", age: 25, active: true, salary: 45000 }

// Automatic Type conversion
console.log("5" + 5);   // "55" to string concatenation
console.log("5" - 2);   // 3   to string converted to number
console.log(true + 1);  // 2   to  true → 1
console.log(false + 5); // 5   to false → 0

// Array with mixed types to normalize
const random = [1, "2", true, "false", 0, "", null, undefined];
const normalized = random.map(x => Boolean(x));
console.log(normalized); 
// [true, true, true, true, false, false, false, false]



// =========================================================================================================================
// Creating Objects in Different Ways
// ========================================================================================================================

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
// CRUD Operations on Objects(Simple)

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
const person = { name: "Ram" };
person["city"] = "Hyderabad"; // bracket notation with string key
person[42] = "the answer"; // numeric key (becomes string "42")
person["full name"] = "Ram Kumar"; // key with space

// Pass by value and Pass by Reference in Objects
//=========================================================================================================================
// Primitives: passed by value (original not changed)
let n = 10;
function incPrimitive(x) {
  x = x + 5;      // changes local copy only
  return x;
}
const newN = incPrimitive(n);
console.log(n);    // 10
console.log(newN); // 15


// OBJECTS
// Example: Student record
let student1 = {
    name: "Sai",
    class: 10,
    marks: 85
};
let student2 = student1; // Both variables point to the SAME object
student2.marks = 90;
console.log(student1.marks); // 90 (changed!)
console.log(student2.marks); // 90

// Reassignment and Mutation
let train1 = { name: "Rajdhani Express", seats: 50 };
let train2 = train1;

// MUTATION
train2.seats = 45;
console.log(train1.seats); // 45 (both affected)

// REASSIGNMENT
train2 = { name: "Vande Bharat", seats: 60 };
console.log(train1.name); // "Rajdhani Express" (train1 unchanged)
console.log(train2.name); // "Shatabdi Express" (train2 points to new object)

// Arrays(also objects - so pass by reference)
// Example: Cricket team players
let team1 = ["Virat", "Rohit", "Bumrah"];
let team2 = team1;

team2.push("Jadeja");

console.log(team1); // ["Virat", "Rohit", "Bumrah", "Jadeja"]
console.log(team2); // ["Virat", "Rohit", "Bumrah", "Jadeja"]
console.log(team1 === team2); // true 


// Nested Objects
let person = {
    name: "Rajesh",
    address: {
        street: "Whitefield",
        city: "Bangalore",
        pincode: 560001
    }
};

let personCopy = person;
personCopy.address.city = "Hyderabad";

console.log(person.address.city); // "Hyderabad" 
// =========================================================================================================================
// Basic Object Methods

const empDetails = {
  name: "Rakesh",
  age: 26,
  city: "Chennai",
  department: "IT",
  salary: 50000
};

console.log(Object.keys(empDetails)); // ["name", "age", "city", "department", "salary"]
console.log(Object.values(empDetails)); // ["Rakesh", 26, "Chennai", "IT", 50000]
console.log(Object.entries(empDetails)); // [[ 'name', 'Rakesh' ],[ 'age', 26 ], [ 'city', 'Chennai' ], [ 'department', 'IT' ], [ 'salary', 50000 ]]

// Shallow Copy
const empp1 = Object.assign({}, empDetails, { bonus: 5000 });
console.log(empp1); 
/* {
  name: 'Rakesh',
  age: 26,
  city: 'Chennai',
  department: 'IT',
  salary: 50000,
  bonus: 5000
} */

const empp2 = { ...empDetails, insurance: 3000 };
console.log(empp2); 
/*
{
  name: 'Rakesh',
  age: 26,
  city: 'Chennai',
  department: 'IT',
  salary: 50000,
  insurance: 3000
}
*/

// Array of Objects - Basic Operations

let employees = [
  { id: 1, name: "Sai", age: 25, salary: 40000, department: "IT", city: "Hyderabad" },
  { id: 2, name: "Kiran", age: 28, salary: 50000, department: "Finance", city: "Mumbai" },
  { id: 3, name: "Ram", age: 30, salary: 60000, department: "IT", city: "Bangalore" },
  { id: 4, name: "Lakshmi", age: 27, salary: 45000, department: "HR", city: "Chennai" }
];

console.log(employees); // Array of 4 employee objects

employees.push({ id: 5, name: "Meera", age: 26, salary: 48000, department: "Marketing", city: "Delhi" });
console.log(employees.length); // 5

const removedEmp = employees.pop();
console.log(removedEmp); // { id: 5, name: "Meera", ... }

employees.unshift({ id: 0, name: "Suresh", age: 35, salary: 80000, department: "Management", city: "Pune" });
console.log(employees.length); // 5

const shiftedEmp = employees.shift();
console.log(shiftedEmp); // { id: 0, name: "Suresh", ... }

employees.splice(1, 1, { id: 6, name: "Divya", age: 29, salary: 55000, department: "Finance", city: "Mumbai" });
console.log(employees.length); // 4 (removed 1, added 1)

const firstTwo = employees.slice(0, 2);
console.log(firstTwo); // First 2 employees


// Map Transform
const employeesWithBonus = employees.map(emp => ({
  ...emp,
  bonus: emp.salary * 0.1,
  totalCompensation: emp.salary * 1.1
}));
console.log(employeesWithBonus); // Each employee now has bonus and totalCompensation

// Filter
const highEarners = employees.filter(emp => emp.salary > 50000);
console.log(highEarners); // Employees earning > 50000

const itDepartment = employees.filter(emp => emp.department === "IT");
console.log(itDepartment); // IT department employees

const youngEmployees = employees.filter(emp => emp.age < 28);
console.log(youngEmployees); // Employees younger than 28

// Reduce

const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
console.log(totalSalary); // Sum of all salaries

const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length;
console.log(avgSalary); // Average salary


// Find and Find Index

const findEmployee = employees.find(emp => emp.name === "Ram");
console.log(findEmployee); // { id: 3, name: "Ram", ... }

const empIndex = employees.findIndex(emp => emp.name === "Ram");
console.log(empIndex); // 2


// Some and Every
const HighSalary = employees.some(emp => emp.salary > 60000);
console.log(HighSalary); // false

const Adults = employees.every(emp => emp.age >= 18);
console.log(Adults); // true

const AllHighSalary = employees.every(emp => emp.salary > 50000);
console.log(AllHighSalary); // false


// Sort

const sortedBySalary = [...employees].sort((a, b) => b.salary - a.salary);
console.log(sortedBySalary); // Employees sorted by salary (descending)

const sortedByAge = [...employees].sort((a, b) => a.age - b.age);
console.log(sortedByAge); // Employees sorted by age (ascending)

// For Each

employees.forEach(emp => {
  console.log(`${emp.name} works in ${emp.department}`); // Prints each employee
});

employees.forEach((emp, index) => {
  console.log(`${index + 1}. ${emp.name}`); // Prints with index
});


// Multiple Chained Operations

const topITEmployees = employees
  .filter(emp => emp.department === "IT")
  .sort((a, b) => b.salary - a.salary)
  .slice(0, 2)
  .map(emp => ({
    ...emp,
    bonus: emp.salary * 0.15,
    rating: "Excellent"
  }));
console.log(topITEmployees); // Top 2 IT employees with bonus

const avgITSalary = employees
  .filter(emp => emp.department === "IT")
  .reduce((sum, emp) => sum + emp.salary, 0) / 
  employees.filter(emp => emp.department === "IT").length;
console.log(avgITSalary);

/* 
  Singleton: a single shared instance (one object) used across the app, good for unique resources (current logged in user).

  Dynamic retrieval: fetching items from a collection (array/object/Map) at runtime it is good for retrieving many items or 
  when data varies. 
  Can be simple search (.find) or optimized with an index (Map/object) or cache


*/


// Singleton Service example as Ceo of the company which is an unique quantity
const CEO = {
  id: 1,
  name: "Sundar",
  role: "CEO",
  salary: 250000
};
console.log(CEO); // { id: 1, name: "Sundar", role: "CEO", salary: 250000 }

// any module or file can import or use the same CEO object reference
const ceoRef = CEO;
ceoRef.salary += 10000;   // mutates the singleton
console.log(CEO.salary);  // 260000

// Dynamic Retrieval 

const employeees = [
  { id: 1, name: "Ram", dept: "IT", salary: 60000 },
  { id: 2, name: "Rahul", dept: "HR", salary: 45000 },
  { id: 3, name: "Rohith", dept: "Finance", salary: 55000 },
  { id: 4, name: "Aakash", dept: "IT", salary: 70000 },
  { id: 5, name: "Kalyan", dept: "HR", salary: 40000 },
  { id: 6, name: "Rakesh", dept: "Finance", salary: 48000 },
  { id: 7, name: "Sai", dept: "IT", salary: 52000 },
  { id: 8, name: "Kiran", dept: "HR", salary: 47000 }
];

// simple dynamic lookup (O(n)) - Bit expensive for the resources
function getById(id) {
  return employeees.find(e => e.id === id);
}
console.log(getById(4)); // { id: 4, name: "Aakash", dept: "IT", salary: 70000 }

// filter example (multiple results)
console.log(employeees.filter(e => e.dept === "IT"));
/* [
  { id:1, name:"Ram", ... },
  { id:4, name:"Aakash", ... },
  { id:7, name:"Sai", ... }
] */
