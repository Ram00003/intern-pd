//To explicity export types like (interfaces, type alias, enums) from a typescript file so they can be imported and used by other files
export type Category = 'beginner' | 'intermediate' | 'advanced'; // Union type of strings

export interface IStudent {   //Student Interface 
  id: string;         
  name: string;
  age: number;
  email: string;
  marks: number;      // 0-100 numeric
  active: boolean;
  joined?: Date;      // ?optional 
  courses: string[];  // course codes
}

export interface ICourse { // Course Interface
  code: string;           
  title: string;
  seats: number;
  enrolled: number;
  category: Category;
  fee?: number;
}

// Payload types allow string|number for easy input
export type StudentPayload = {
  id: string | number;
  name: string;
  age?: number | string;
  email?: string;
  marks?: number | string;
  active?: boolean | string;
  joined?: Date | string;
  courses?: (string | number)[];
};


export type CoursePayload = {
  code: string | number;
  title: string;
  seats: number;
  category: Category;
  fee?: number;
};

// Student class: small, private fields, getters/setters (simple)
export class Student {
  private _id: string;
  private _name: string = 'Unknown';
  private _age: number = 18;
  private _email: string = 'unknown@example.com';
  private _marks: number = 0;
  private _active: boolean = true;
  private _joined: Date = new Date();
  private _courses: string[] = [];

  constructor(p: StudentPayload) {
    this._id = Student.formatId(p.id);
    this.name = p.name;
    if (p.age !== undefined) this.age = p.age;
    if (p.email !== undefined) this.email = p.email;
    if (p.marks !== undefined) this.marks = p.marks;
    if (p.active !== undefined) this.active = p.active;
    if (p.joined !== undefined) this._joined = new Date(p.joined);
    if (p.courses) this._courses = p.courses.map(x => String(x));
  }

  // simple id formatting
  static formatId(id: string | number): string {
    return typeof id === 'number' ? `R-${String(id).padStart(3, '0')}` : String(id).trim();
  }

  // getters
  get id(): string { return this._id; }
  get shortId(): string { return this._id.replace(/^R-0*/, ''); }
  get name(): string { return this._name; }
  get age(): number { return this._age; }
  get email(): string { return this._email; }
  get marks(): number { return this._marks; }
  get cgpa10(): number { return Math.round(Math.min(10, this._marks / 9.5) * 100) / 100; }
  get active(): boolean { return this._active; }
  get courses(): string[] { return [...this._courses]; }

  // setters (simple validation & conversions)
  set name(v: string) {
    const s = String(v).trim();
    if (s.length < 3) throw new Error('Name must be >= 3 chars');
    this._name = s;
  }

  set age(v: number | string) {
    const n = typeof v === 'string' ? parseInt(v, 10) : Math.floor(v);
    if (Number.isNaN(n)) throw new Error('Age must be numeric');
    if (n < 16 || n > 100) throw new Error('Age must be between 16 and 100');
    this._age = n;
  }

  set email(v: string) {
    const e = String(v).trim().toLowerCase();
    if (!e.includes('@')) throw new Error('Email must contain @');
    this._email = e;
  }

  set marks(v: number | string) {
    let m: number;
    if (typeof v === 'number') m = v;
    else {
      const s = String(v).trim();
      if (s.endsWith('%')) m = parseFloat(s.slice(0, -1));
      else if (s.length === 1) {
        // letter shorthand -> approximate percent
        const map: Record<string, number> = { A: 95, B: 82, C: 68, D: 55, F: 35 };
        m = map[s.toUpperCase()] ?? 0;
      } else m = parseFloat(s);
    }
    if (Number.isNaN(m)) throw new Error('Invalid marks');
    if (m < 0 || m > 100) throw new Error('Marks 0-100');
    this._marks = Math.round(m * 100) / 100;
  }

  set active(v: boolean | string) {
    if (typeof v === 'boolean') this._active = v;
    else {
      const s = String(v).toLowerCase();
      this._active = s === 'true' || s === 'yes' || s === '1' || s === 'active';
    }
  }

  // course helpers
  join(code: string | number) {
    const c = String(code);
    if (!this._courses.includes(c)) this._courses.push(c);
  }
  leave(code: string | number) {
    const c = String(code);
    this._courses = this._courses.filter(x => x !== c);
  }

  toObject(): IStudent {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
      marks: this.marks,
      active: this.active,
      joined: this._joined,
      courses: this.courses,
    };
  }
}

// Course class
export class Course {
  private _code: string;
  private _title: string = 'untitled';
  private _seats: number = 1;
  private _enrolled: number = 0;
  private _category: Category;
  private _fee?: number;

  constructor(p: CoursePayload) {
    this._code = Course.formatCode(p.code);
    this.title = p.title;
    this.seats = p.seats;
    this._category = p.category;
    this._fee = p.fee;
  }

  static formatCode(c: string | number): string {
    return typeof c === 'number' ? `C-${String(c).padStart(3, '0')}` : String(c).trim();
  }

  get code(): string { return this._code; }
  get title(): string { return this._title; }
  get seats(): number { return this._seats; }
  get enrolled(): number { return this._enrolled; }
  get category(): Category { return this._category; }
  get fee(): number | undefined { return this._fee; }

  set title(v: string) {
    const s = String(v).trim();
    if (s.length < 3) throw new Error('Title short');
    this._title = s;
  }

  set seats(n: number) {
    if (!Number.isInteger(n) || n <= 0) throw new Error('Seats must be positive integer');
    if (this._enrolled > n) throw new Error('Seats less than enrolled');
    this._seats = n;
  }

  set category(c: Category) { this._category = c; }
  set fee(f: number | undefined) {
    if (typeof f !== 'undefined' && f < 0) throw new Error('Fee must be >= 0');
    this._fee = f;
  }

  addOne() {
    if (this._enrolled + 1 > this._seats) throw new Error('No seats left');
    this._enrolled++;
  }
  removeOne() {
    if (this._enrolled - 1 < 0) throw new Error('Enrolled cannot be negative');
    this._enrolled--;
  }

  toObject(): ICourse {
    return {
      code: this.code,
      title: this.title,
      seats: this.seats,
      enrolled: this.enrolled,
      category: this.category,
      fee: this.fee,
    };
  }
}
