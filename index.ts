import { TaskStore } from '../task-store.interface';
import { TaskDTO } from 'src/dto/task.dto';
import { TaskHistoryDTO } from 'src/dto/taskHistory.dto';
import { Task } from 'src/models/task.model';
import { TaskStatus } from 'src/enums/taskStatus.enum';

export class SequelizeTaskStore implements TaskStore {
  
  // Create a new task record
  async createTask(task: TaskDTO): Promise<TaskDTO> {
    const createdTask = await Task.create(task);
    return createdTask;
  }

  // Update existing task (also handles soft delete)
  async updateTask(taskId: number, task: TaskDTO): Promise<TaskDTO> {
    // If the update includes soft-delete info, ensure status changes to 'deleted'
    if (task.deleted_at || task.deleted_by) {
      task.task_status = TaskStatus.Deleted;
    }

    await Task.update(task, { where: { task_id: taskId } });
    const updatedTask = await Task.findByPk(taskId);
    return updatedTask!;
  }

  // Fetch a single task by ID
  async getTask(taskId: number): Promise<TaskDTO | null> {
    return await Task.findByPk(taskId);
  }

  // Fetch all tasks
  async getAllTasks(): Promise<TaskDTO[]> {
    return await Task.findAll();
  }

  // Placeholder for history (to implement once TaskHistory model exists)
  async getTaskHistory(taskId: number): Promise<TaskHistoryDTO[]> {
    return []; // To be implemented later
  }
}

export default SequelizeTaskStore;
