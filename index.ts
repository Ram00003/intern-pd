import { TaskStore } from '../task-store.interface';
import { TaskDTO } from 'src/dto/task.dto';
import { TaskHistoryDTO } from 'src/dto/taskHistory.dto';
import { Task } from 'src/models/task.model';
import { TaskHistory } from 'src/models/taskHistory.model';

export class SequelizeTaskStore implements TaskStore {
  /**
   * Create a new task. Returns a plain DTO-like object.
   */
  async createTask(task: TaskDTO): Promise<TaskDTO> {
    const created = await Task.create(task as any);
    return created.get({ plain: true }) as TaskDTO;
  }

  /**
   * Partial update:
   * - Only updates fields that are provided (not undefined).
   * - Keeps updated_at "partial": we DO NOT auto-update it.
   *   If you want to update 'updated_at', pass it in the payload.
   * - Returns the updated plain object, or null if not found.
   */
  async updateTask(taskId: number, task: TaskDTO): Promise<TaskDTO | null> {
    // Define which fields are allowed to be updated
    const UPDATABLE_FIELDS: (keyof TaskDTO)[] = [
      'task_name',
      'task_description',
      'predecessor',
      'task_status',
      'planned_start',
      'planned_end',
      'actual_start',
      'actual_end',
      'priority',
      'assigned_to',
      'assigned_by',
      'assigned_at',
      'task_order',
      'updated_by',
      'deleted_at',
      'deleted_by',
      // 'updated_at' is allowed but only if the caller provides it (partial control)
      'updated_at',
    ];

    // Build the partial update payload
    const data: Record<string, any> = {};
    const fields: string[] = [];

    for (const key of UPDATABLE_FIELDS) {
      if (task[key] !== undefined) {
        data[key as string] = task[key] as any;
        fields.push(key as string);
      }
    }

    // If nothing to update, just return the current row (or null)
    if (fields.length === 0) {
      const current = await Task.findByPk(taskId);
      return current ? (current.get({ plain: true }) as TaskDTO) : null;
    }

    // IMPORTANT: Keep updated_at partial:
    // Use 'silent: true' so Sequelize DOES NOT auto-update updated_at.
    await Task.update(data, {
      where: { task_id: taskId },
      fields,
      silent: true, // prevents Sequelize from auto-setting updated_at
    });

    const updated = await Task.findByPk(taskId);
    return updated ? (updated.get({ plain: true }) as TaskDTO) : null;
  }

  /**
   * Get a single task by ID.
   */
  async getTask(taskId: number): Promise<TaskDTO | null> {
    const found = await Task.findByPk(taskId);
    return found ? (found.get({ plain: true }) as TaskDTO) : null;
  }

  /**
   * Get all tasks.
   */
  async getAllTasks(): Promise<TaskDTO[]> {
    const rows = await Task.findAll();
    return rows.map((r) => r.get({ plain: true }) as TaskDTO);
  }

  /**
   * Get task history for a given task_id.
   * Uses your TaskHistory model.
   */
  async getTaskHistory(taskId: number): Promise<TaskHistoryDTO[]> {
    const rows = await TaskHistory.findAll({
      where: { task_id: taskId },
      order: [['history_id', 'ASC']],
    });
    return rows.map((r) => r.get({ plain: true }) as TaskHistoryDTO);
  }
}

export default SequelizeTaskStore;
