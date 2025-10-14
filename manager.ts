// manager.ts
// Abstract base + Manager (simple CRUD, constructor overloads, basic business rules)

import { Student, Course, StudentPayload, CoursePayload, IStudent, ICourse } from './entities';

// Abstract base with protected arrays & small helpers
export abstract class Base {
  protected students: Student[] = [];
  protected courses: Course[] = [];

  protected toStr(n: number, unit?: string) {
    return unit ? `${n.toLocaleString()} ${unit}` : n.toLocaleString();
  }

  getAllStudents(): IStudent[] { return this.students.map(s => s.toObject()); }
  getAllCourses(): ICourse[] { return this.courses.map(c => c.toObject()); }

  abstract display(): void;
  abstract validate(): boolean;
}

// Manager extends Base. Constructor overloads using optional params.
export class Manager extends Base {
  private _name: string;
  private _capacity: number;
  private _locked: boolean = false;

  // overloads: new(), new(name), new(name, capacity)
  constructor();
  constructor(name: string);
  constructor(name: string, capacity: number);
  constructor(name?: string, capacity?: number) {
    super();
    this._name = name ?? 'Local Place';
    this._capacity = capacity ?? 50;
  }

  display(): void {
    console.log(`${this._name} | cap: ${this._capacity} | students: ${this.students.length} | courses: ${this.courses.length}`);
  }

  validate(): boolean {
    // simple duplicate email or duplicate course code check
    const emails: string[] = [];
    for (const s of this.students) {
      if (emails.includes(s.email)) return false;
      emails.push(s.email);
    }
    const codes: string[] = [];
    for (const c of this.courses) {
      if (codes.includes(c.code)) return false;
      codes.push(c.code);
    }
    return true;
  }

  lock() { this._locked = true; }
  unlock() { this._locked = false; }
  isLocked() { return this._locked; }

  // STUDENT CRUD (uses StudentPayload for flexible inputs)
  addStudent(p: StudentPayload): Student {
    if (this._locked) throw new Error('Locked');
    if (this.students.length >= this._capacity) throw new Error('Capacity full');

    const id = Student.formatId(p.id);
    if (this.students.some(s => s.id === id || s.shortId === String(p.id))) throw new Error('Duplicate id');
    if (p.email && this.students.some(s => s.email === (p.email as string).toLowerCase())) throw new Error('Email taken');

    const s = new Student(p);
    this.students.push(s);
    return s;
  }

  updateStudent(id: string | number, upd: Partial<StudentPayload>): IStudent {
    const fid = typeof id === 'number' ? Student.formatId(id) : String(id);
    const idx = this.students.findIndex(s => s.id === fid || s.shortId === String(id));
    if (idx === -1) throw new Error('Student not found');
    const st = this.students[idx];

    if (upd.email && this.students.some((x, i) => i !== idx && x.email === upd.email?.toLowerCase())) throw new Error('Email used');

    try {
      if (upd.name !== undefined) st.name = upd.name!;
      if (upd.age !== undefined) st.age = upd.age as any;
      if (upd.email !== undefined) st.email = upd.email;
      if (upd.marks !== undefined) st.marks = upd.marks as any;
      if (upd.active !== undefined) st.active = upd.active as any;
      if (upd.courses !== undefined) (st as any)._courses = (upd.courses as any).map((x: any) => String(x));
    } catch (e) {
      throw new Error('Update failed: ' + (e as Error).message);
    }
    return st.toObject();
  }

  deleteStudent(id: string | number): boolean {
    if (this._locked) throw new Error('Locked');
    const fid = typeof id === 'number' ? Student.formatId(id) : String(id);
    const idx = this.students.findIndex(s => s.id === fid || s.shortId === String(id));
    if (idx === -1) throw new Error('Student not found');
    const s = this.students[idx];
    if (s.courses.length > 0) throw new Error('Student enrolled; unenroll first');
    this.students.splice(idx, 1);
    return true;
  }

  getStudent(id: string | number): IStudent | undefined {
    return this.getAllStudents().find(x => x.id === (typeof id === 'number' ? Student.formatId(id) : String(id)) || x.id.replace(/^R-0*/, '') === String(id));
  }

  // COURSE CRUD
  addCourse(p: CoursePayload): Course {
    if (this._locked) throw new Error('Locked');
    const code = Course.formatCode(p.code);
    if (this.courses.some(c => c.code === code)) throw new Error('Course code dup');
    if (p.seats <= 0) throw new Error('Seats +ve');
    const c = new Course(p);
    this.courses.push(c);
    return c;
  }

  updateCourse(code: string | number, upd: Partial<CoursePayload>): ICourse {
    const f = typeof code === 'number' ? Course.formatCode(code) : String(code);
    const idx = this.courses.findIndex(c => c.code === f || c.code === String(code));
    if (idx === -1) throw new Error('Course not found');
    const cr = this.courses[idx];
    try {
      if (upd.title !== undefined) cr.title = upd.title!;
      if (upd.seats !== undefined) cr.seats = upd.seats!;
      if (upd.category !== undefined) cr.category = upd.category!;
      if (upd.fee !== undefined) cr.fee = upd.fee;
    } catch (e) {
      throw new Error('Course update fail: ' + (e as Error).message);
    }
    return cr.toObject();
  }

  deleteCourse(code: string | number): boolean {
    if (this._locked) throw new Error('Locked');
    const f = typeof code === 'number' ? Course.formatCode(code) : String(code);
    const idx = this.courses.findIndex(c => c.code === f || c.code === String(code));
    if (idx === -1) throw new Error('Course not found');
    const cr = this.courses[idx];
    if (cr.enrolled > 0) throw new Error('Course has enrolled students');
    this.courses.splice(idx, 1);
    return true;
  }

  getCourse(code: string | number): ICourse | undefined {
    return this.getAllCourses().find(x => x.code === (typeof code === 'number' ? Course.formatCode(code) : String(code)));
  }

  // enrollment simple (no Map): courseCode -> student names (built when needed)
  enroll(studentId: string | number, courseCode: string | number) {
    if (this._locked) throw new Error('Locked');
    const st = this.students.find(s => s.id === (typeof studentId === 'number' ? Student.formatId(studentId) : String(studentId)) || s.shortId === String(studentId));
    const cr = this.courses.find(c => c.code === (typeof courseCode === 'number' ? Course.formatCode(courseCode) : String(courseCode)));
    if (!st) throw new Error('Student not found');
    if (!cr) throw new Error('Course not found');
    if (!st.active) throw new Error('Inactive student');

    cr.addOne();   // may throw if full
    st.join(cr.code);
  }

  unenroll(studentId: string | number, courseCode: string | number) {
    const st = this.students.find(s => s.id === (typeof studentId === 'number' ? Student.formatId(studentId) : String(studentId)) || s.shortId === String(studentId));
    const cr = this.courses.find(c => c.code === (typeof courseCode === 'number' ? Course.formatCode(courseCode) : String(courseCode)));
    if (!st || !cr) throw new Error('Not found');
    st.leave(cr.code);
    cr.removeOne();
  }

  // build enroll list object: code -> [student names]
  buildEnrollList(): { [code: string]: string[] } {
    const out: { [k: string]: string[] } = {};
    this.courses.forEach(c => out[c.code] = []);
    this.students.forEach(s => s.courses.forEach(code => {
      if (!out[code]) out[code] = [];
      out[code].push(s.name);
    }));
    return out;
  }

  // simple stats using array methods
  stats() {
    const arr = this.students.map(s => s.toObject());
    const count = arr.length;
    const avgAge = count ? arr.reduce((a, b) => a + b.age, 0) / count : undefined;
    const avgMarks = count ? arr.reduce((a, b) => a + b.marks, 0) / count : undefined;
    const split: { [k: string]: number } = {};
    arr.forEach(st => {
      const key = st.marks >= 85 ? 'A' : st.marks >= 70 ? 'B' : st.marks >= 50 ? 'C' : 'D';
      split[key] = (split[key] ?? 0) + 1;
    });
    return { count, avgAge, avgMarks, split };
  }
}
