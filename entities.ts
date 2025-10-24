import { TaskDTO } from '../../dto/task.dto';
import { TaskHistoryDTO } from '../../dto/taskHistory.dto';

export interface TaskStore {
  createTask(task: TaskDTO): TaskDTO;
  updateTask(taskId: number, task: TaskDTO): TaskDTO | null;
  getTask(taskId: number): TaskDTO | null;
  getAllTasks(): TaskDTO[];
  getTaskHistory(taskId: number): TaskHistoryDTO[];
  deleteTask(taskId: number): boolean;
}

export class TaskStorage implements TaskStore {
  private tasksMap = new Map<number, TaskDTO>();
  private taskHistoryMap = new Map<number, TaskHistoryDTO[]>();
  private nextTaskId = 1;
  private nextHistoryId = 1;

  // Create a new task
  createTask(task: TaskDTO): TaskDTO {
    task.task_id = this.nextTaskId++;
    task.created_at = new Date();

    this.tasksMap.set(task.task_id, task);

    // record first history
    const history = new TaskHistoryDTO(
      task.task_id,
      task.task_name,
      task.task_status,
      task.priority,
      this.nextHistoryId++
    );

    this.taskHistoryMap.set(task.task_id, [history]);
    return task;
  }

  // Update existing task
  updateTask(taskId: number, task: TaskDTO): TaskDTO | null {
    const existing = this.tasksMap.get(taskId);
    if (!existing) return null;

    task.updated_at = new Date();
    this.tasksMap.set(taskId, task);

    const newHistory = new TaskHistoryDTO(
      task.task_id!,
      task.task_name,
      task.task_status,
      task.priority,
      this.nextHistoryId++
    );

    const historyArray = this.taskHistoryMap.get(taskId) || [];
    historyArray.push(newHistory);
    this.taskHistoryMap.set(taskId, historyArray);

    return task;
  }

  // Retrieve a single task
  getTask(taskId: number): TaskDTO | null {
    return this.tasksMap.get(taskId) || null;
  }

  // Retrieve all tasks
  getAllTasks(): TaskDTO[] {
    return Array.from(this.tasksMap.values());
  }

  // Retrieve history for a specific task
  getTaskHistory(taskId: number): TaskHistoryDTO[] {
    return this.taskHistoryMap.get(taskId) || [];
  }

  // Delete task
  deleteTask(taskId: number): boolean {
    const deleted = this.tasksMap.delete(taskId);
    if (deleted) {
      const deletionRecord = new TaskHistoryDTO(
        taskId,
        `Task ${taskId} deleted`,
        'completed',
        'P4',
        this.nextHistoryId++
      );
      const historyArray = this.taskHistoryMap.get(taskId) || [];
      historyArray.push(deletionRecord);
      this.taskHistoryMap.set(taskId, historyArray);
    }
    return deleted;
  }
}
