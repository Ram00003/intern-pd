import { SequelizeTaskStore } from 'src/stores/database-implementation/sequelize-task-store';
import { TaskStatus } from 'src/enums/taskStatus.enum';
import { Priority } from 'src/enums/priority.enum';

describe('SequelizeTaskStore (Direct Instance)', () => {
  const store = new SequelizeTaskStore();

  test('Create Task', async () => {
    const task = {
      task_name: 'Create',
      task_status: TaskStatus.Pending,
      priority: Priority.P1,
      created_by: 3,
    };

    const created = await store.createTask(task as any);
    expect(created.task_name).toBe('Create');
  });

  test('Update Task', async () => {
    const task = {
      task_name: 'Updated Task',
      task_status: TaskStatus.Pending,
      priority: Priority.P2,
      created_by: 3,
    };

    const created = await store.createTask(task as any);
    const updated = await store.updateTask(created.task_id, {
      task_name: 'Updated Task',
      task_status: TaskStatus.Completed,
      priority: Priority.P1,
      created_by: 3,
    } as any);

    expect(updated).not.toBeNull();
    expect(updated!.task_name).toBe('Updated Task');
  });

  test('Get Task by ID', async () => {
    const task = {
      task_name: 'Fetch Task',
      task_status: TaskStatus.Pending,
      priority: Priority.P3,
      created_by: 3,
    };

    const created = await store.createTask(task as any);
    const found = await store.getTask(created.task_id);

    expect(found).not.toBeNull();
    expect(found!.task_name).toBe('Fetch Task');
  });

  test('Get All Tasks', async () => {
    const allTasks = await store.getAllTasks();
    expect(Array.isArray(allTasks)).toBe(true);
  });

  test('Get Task History', async () => {
    const task = {
      task_name: 'History Test',
      task_status: TaskStatus.Pending,
      priority: Priority.P1,
      created_by: 3,
    };

    const created = await store.createTask(task as any);
    const history = await store.getTaskHistory(created.task_id);

    expect(Array.isArray(history)).toBe(true);
  });
});
