import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { SequelizeTaskStore } from 'src/stores/database-implementation/sequelize-task-store';
import { TaskDTO } from 'src/dto/task.dto';
import { TaskStatus } from 'src/enums/taskStatus.enum';
import { Priority } from 'src/enums/priority.enum';

describe('SequelizeTaskStore', () => {
  let app: INestApplication;
  let store: SequelizeTaskStore;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    store = app.get(SequelizeTaskStore);
  });

  afterAll(async () => {
    await app.close();
  });

  test('Create Task', async () => {
    const task: TaskDTO = {
      task_name: 'Create',
      task_status: TaskStatus.Pending,
      priority: Priority.P1,
      created_by: 3,
    };

    const created = await store.createTask(task);
    expect(created.task_name).toBe('Create');
  });

  test('Update Task', async () => {
    const task: TaskDTO = {
      task_name: 'Updated Task',
      task_status: TaskStatus.Pending,
      priority: Priority.P2,
      created_by: 3,
    };

    const created = await store.createTask(task);
    const updated = await store.updateTask(created.task_id!, {
      task_name: 'Updated Task',
      task_status: TaskStatus.Completed,
      priority: Priority.P1,
      created_by: 3
    });

    expect(updated).not.toBeNull();
    expect(updated!.task_name).toBe('Updated Task');
  });

  test('Get Task by ID', async () => {
    const task: TaskDTO = {
      task_name: 'Fetch Task',
      task_status: TaskStatus.Pending,
      priority: Priority.P3,
      created_by: 3,
    };

    const created = await store.createTask(task);
    const found = await store.getTask(created.task_id!);

    expect(found).not.toBeNull();
    expect(found!.task_name).toBe('Fetch Task');
  });

  test('Get All Tasks', async () => {
    const allTasks = await store.getAllTasks();
    expect(Array.isArray(allTasks)).toBe(true);
    expect(allTasks.length).toBeGreaterThan(0);
  });

  test('Get Task History', async () => {
    const task: TaskDTO = {
      task_name: 'History Test',
      task_status: TaskStatus.Pending,
      priority: Priority.P1,
      created_by: 3,
    };

    const created = await store.createTask(task);
    const history = await store.getTaskHistory(created.task_id!);

    expect(Array.isArray(history)).toBe(true);
  });
});


Syntax error
 105 |
      106 | describe('SequelizeTaskStore', () => {
    > 107 |   let app: INestApplication;
          |          ^
      108 |   let store: SequelizeTaskStore;
      109 |
      110 |   beforeAll(async () => {
