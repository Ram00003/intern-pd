//==============================================================================================
//  BASE CLASS
//==============================================================================================
interface IDataObject {
  a: number;
  b: string;
  c: object;
  d: any[];
  [key: string]: any;
}

abstract class BaseClass {
  // private fields
  private id: string;
  private key: string;
  // child classes can use this as a starting point
  private obj: IDataObject;

  constructor() {
    this.id = "base-001";
    this.key = "secret";
    this.obj = {
      a: 0,
      b: "",
      c: {},
      d: []
    };
  }

  //CRUD operations to be implemented in subclass
  abstract create(value: any): void;
  abstract read(): any;
  abstract update(key: string, value: any): void;
  abstract delete(key: string): void;

  // array signatures
  abstract add(item: any): void;
  abstract remove(index: number): void;
  abstract updateItem(index: number, value: any): void;

  // getters for subclasses
  protected getObj(): IDataObject {
    return this.obj;
  }

  protected getId(): string {
    return this.id;
  }

  protected getKey(): string {
    return this.key;
  }

  // Setter (restricted access)
  protected setObjField(key: string, value: any): void {
    (this.obj as any)[key] = value;
  }

  protected setId(id: string): void {
    this.id = id;
  }

  protected setKey(key: string): void {
    this.key = key;
  }
}


//=============================================================
//      CLASS A EXTENDS BASE CLASS
//=============================================================
class A extends BaseClass {
  constructor() {
    super();
  }

  // Create — adds new key-value pair if key doesn't exist
  create(value: any): void {
    const key = `key_${Object.keys(this.getObj()).length}`;
    this.setObjField(key, value);
  }

  // Read — returns current object snapshot
  read(): any {
    return this.getObj();
  }

  // Update — modifies existing key value
  update(key: string, value: any): void {
    const obj = this.getObj();
    if (key in obj) {
      this.setObjField(key, value);
    }
  }

  // Delete — removes a key if it exists
  delete(key: string): void {
    const obj = this.getObj();
    if (key in obj) {
      delete (obj as any)[key];
    }
  }

  // Array operations on obj.d
  add(item: any): void {
    this.getObj().d.push(item);
  }

  remove(index: number): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr.splice(index, 1);
    }
  }

  updateItem(index: number, value: any): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr[index] = value;
    }
  }
}


//===========================================================
//          Class B extends A
//===========================================================

interface ITypedArrayElement {
  a: boolean;
  b: number;
  c: string;
}

class B extends A {
  constructor() {
    super();

    // initializing object fields via protected methods
    this.setObjField('a', 1);
    this.setObjField('b', 'B-class');
    this.setObjField('c', {});
    this.setObjField('d', [
      { a: true, b: 10, c: 'x' },
      { a: false, b: 20, c: 'y' }
    ]);
  }

  // CRUD on private obj 
  create(value: any): void {
    const key = `key_${Object.keys(this.getObj()).length}`;
    this.setObjField(key, value);
  }

  read(): any {
    return this.getObj();
  }

  update(key: string, value: any): void {
    const obj = this.getObj();
    if (key in obj) {
      this.setObjField(key, value);
    }
  }

  delete(key: string): void {
    const obj = this.getObj();
    if (key in obj) {
      delete (obj as any)[key];
    }
  }

  // Array operations on obj.d
  add(item: ITypedArrayElement): void {
    this.getObj().d.push(item);
  }

  remove(index: number): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr.splice(index, 1);
    }
  }

  updateItem(index: number, value: ITypedArrayElement): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr[index] = value;
    }
  }

  // Type Conversion Helpers
  private stringToNumber(value: string): number {
    return Number(value);
  }

  private numberToString(value: number): string {
    return String(value);
  }

  private booleanToNumber(value: boolean): number {
    return value ? 1 : 0;
  }

  private numberToBoolean(value: number): boolean {
    return value !== 0;
  }

  private arrayToString(arr: any[]): string {
    return arr.join(',');
  }

  private stringToArray(str: string): string[] {
    return str.split(',');
  }

  private objectToArray(obj: object): any[] {
    return Object.entries(obj);
  }

  private arrayToObject(arr: any[]): object {
    return Object.fromEntries(arr);
  }

  // conversions
  convertBooleanArrayToNumberArray(): number[] {
    return this.getObj().d.map(el => this.booleanToNumber(el.a));
  }

  convertNumberArrayToBooleanArray(): boolean[] {
    return this.getObj().d.map(el => this.numberToBoolean(el.b));
  }

  // Restricted setter example (only accepts numeric strings or numbers)
  setA(value: string | number): void {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      this.setObjField('a', Number(value));
    }
  }

  // Protected example 
  protected setB(value: string): void {
    this.setObjField('b', value.trim());
  }
}


//========================================================================
//              CLASS C
//===================================================================
// it uses ClassB’s public methods to manipulate data indirectly.

class C {
  private handler: B;

  constructor() {
    this.handler = new B();
  }

  // Demonstrate public CRUD operations
  performCRUD(): void {
    // Create
    this.handler.create({ newKey: 'value1' });
    this.handler.create({ newKey: 'value2' });

    // Update
    this.handler.update('b', 'Updated from ClassC');

    // Delete
    this.handler.delete('key_0');
  }

  //  array operations
  performArrayOps(): void {
    this.handler.add({ a: true, b: 99, c: 'Added' });
    this.handler.updateItem(0, { a: false, b: 55, c: 'Modified' });
    this.handler.remove(1);
  }

  //  conversions
  testConversions(): void {
    const boolToNum = this.handler.convertBooleanArrayToNumberArray();
    const numToBool = this.handler.convertNumberArrayToBooleanArray();

    console.log('Boolean→Number:', boolToNum);
    console.log('Number→Boolean:', numToBool);
  }

  // Read-only access
  displayState(): void {
    console.log('Current State:', this.handler.read());
  }
}

/* 
{
  "a": 1,
  "b": "Updated from ClassC",
  "c": {},
  "d": [
    { "a": false, "b": 55, "c": "Modified" },
    { "a": true,  "b": 99, "c": "Added" }
  ],
  "key_4": { "newKey": "value1" },
  "key_5": { "newKey": "value2" }
}

*/

