import { SequelizeTaskStore } from 'src/stores/database-implementation/sequelize-task-store';
import { TaskDTO } from 'src/dto/task.dto';
import { TaskStatus } from 'src/enums/taskStatus.enum';
import { Priority } from 'src/enums/priority.enum';

describe('SequelizeTaskStore (Direct Tests)', () => {
  const store = new SequelizeTaskStore();

  test('Create Task', async () => {
    const task: TaskDTO = {
      task_name: 'Create',
      task_status: TaskStatus.Pending,
      priority: Priority.P1,
      created_by: 3,
    };

    const created = await store.createTask(task);
    expect(created.task_name).toBe('Create');
    expect(created.task_id).toBeDefined();
  });

  test('Update Task', async () => {
    const task: TaskDTO = {
      task_name: 'Initial Task',
      task_status: TaskStatus.Pending,
      priority: Priority.P2,
      created_by: 3,
    };

    const created = await store.createTask(task);

    // TypeScript guard ensures created.task_id exists
    if (!created.task_id) throw new Error('Created task missing ID');

    const updated = await store.updateTask(created.task_id, {
      task_name: 'Updated Task',
      task_status: TaskStatus.Completed,
      priority: Priority.P1,
      created_by: 3,
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
    if (!created.task_id) throw new Error('Created task missing ID');

    const found = await store.getTask(created.task_id);
    expect(found).not.toBeNull();
    expect(found!.task_name).toBe('Fetch Task');
  });

  test('Get All Tasks', async () => {
    const allTasks = await store.getAllTasks();
    expect(Array.isArray(allTasks)).toBe(true);
  });

  test('Get Task History', async () => {
    const task: TaskDTO = {
      task_name: 'History Test',
      task_status: TaskStatus.Pending,
      priority: Priority.P1,
      created_by: 3,
    };

    const created = await store.createTask(task);
    if (!created.task_id) throw new Error('Created task missing ID');

    const history = await store.getTaskHistory(created.task_id);
    expect(Array.isArray(history)).toBe(true);
  });
});
