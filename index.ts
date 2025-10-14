// index.ts
// Entry demo + Reporter (depends only on Manager). Very small and focused.

import { Manager } from './manager';
import { StudentPayload, CoursePayload } from './entities';

// Simple Reporter depends on Manager only
class Reporter {
  constructor(private mgr: Manager) {}
  summary(): string {
    const s = this.mgr.stats();
    const enroll = this.mgr.buildEnrollList();
    return [
      `Summary: students=${s.count}`,
      `avgAge=${typeof s.avgAge === 'number' ? s.avgAge.toFixed(1) : 'N/A'}`,
      `avgMarks=${typeof s.avgMarks === 'number' ? s.avgMarks.toFixed(1) : 'N/A'}`,
      `split=${JSON.stringify(s.split)}`,
      `enroll=${JSON.stringify(enroll)}`
    ].join(' | ');
  }
  csv(): string {
    const enroll = this.mgr.buildEnrollList();
    const lines = ['code,count,names'];
    for (const code in enroll) lines.push(`${code},${enroll[code].length},"${enroll[code].join('|')}"`);
    return lines.join('\n');
  }
}

// Demo
const mgr = new Manager();          // empty constructor
mgr.display();

// Add courses (CoursePayload)
const c1: CoursePayload = { code: 1, title: 'TS Basic', seats: 2, category: 'beginner' };
const c2: CoursePayload = { code: 2, title: 'Algo', seats: 3, category: 'advanced' };
mgr.addCourse(c1);
mgr.addCourse(c2);
console.log('Courses:', mgr.getAllCourses());

// Add students (StudentPayload variety: numbers, strings, letters)
const s1: StudentPayload = { id: 1, name: 'Anu', age: '18', email: 'anu@example.com', marks: 'A' };
const s2: StudentPayload = { id: '002', name: 'Rohit', age: 20, email: 'rohit@x.com', marks: '82' };
const s3: StudentPayload = { id: 3, name: 'Nita', age: '22', email: 'nita@x.com', marks: '68%' };

mgr.addStudent(s1);
mgr.addStudent(s2);
mgr.addStudent(s3);

console.log('Students:', mgr.getAllStudents());

// Enroll (tests seats)
mgr.enroll(1, 1);
mgr.enroll('002', 1);
try {
  mgr.enroll(3, 1); // should fail (seat limit 2)
} catch (e) {
  console.log('Expected enroll fail:', (e as Error).message);
}

// Show conversion examples
const stu = mgr.getStudent(1);
console.log('Student 1 marks & CGPA:', stu?.marks, '->', (stu ? (stu.marks / 9.5).toFixed(2) : 'N/A'));

// Update a student (Partial)
mgr.updateStudent(1, { age: '19', marks: 'B', email: 'anu2@example.com' });
console.log('Updated student 1:', mgr.getStudent(1));

// Try restrictions
try { mgr.addStudent({ id: 1, name: 'Dup', email: 'dup@x.com' } as any); } catch (e) { console.log('Expected dup id:', (e as Error).message); }
try { mgr.addStudent({ id: 4, name: 'Kid', age: 12, email: 'kid@x.com' } as any); } catch (e) { console.log('Expected age error:', (e as Error).message); }
try { mgr.addStudent({ id: 5, name: 'BadEmail', age: 20, email: 'bad' } as any); } catch (e) { console.log('Expected email error:', (e as Error).message); }

// Unenroll and delete student
mgr.unenroll(1, 1);
console.log('After unenroll enroll list:', mgr.buildEnrollList());
mgr.deleteStudent(1);
console.log('Deleted student 1, students now:', mgr.getAllStudents());

// Course deletion protections
try { mgr.deleteCourse(1); } catch (e) { console.log('Expected course delete fail if enrolled (or already handled):', (e as Error).message); }

// Stats & report
const rep = new Reporter(mgr);
console.log('REPORT:', rep.summary());
console.log('CSV:\n' + rep.csv());

// Lock/unlock demo
mgr.lock();
try { mgr.addStudent({ id: 10, name: 'Locked', age: 21, email: 'l@x.com' } as any); } catch (e) { console.log('Expected locked add:', (e as Error).message); }
mgr.unlock();
mgr.addStudent({ id: 10, name: 'Locked', age: 21, email: 'l@x.com' } as any);
mgr.display();
