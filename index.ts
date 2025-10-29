import { TaskStore } from "../task-store.interface";
import { TaskDTO } from "src/dto/task.dto";
import { TaskHistoryDTO } from "src/dto/taskHistory.dto";
import { UserDTO } from "src/dto/user.dto";
import { Task } from "src/models/task.model";
import { TaskHistory } from "src/models/taskHistory.model";
import { TaskStatus } from "src/enums/taskStatus.enum";
import { Op } from 'sequelize';
import { Sequelize } from "sequelize";


export class SequelizeTaskStore implements TaskStore {
  
  // Create a new task record
  async createTask(task: TaskDTO): Promise<TaskDTO> {
    const createdTask = await Task.create(task);
    return createdTask;
  }


  async updateTask(taskId: number, task: TaskDTO): Promise<TaskDTO | null> {
    await Task.update(task, { where: { task_id: taskId } });
    const updatedTask = await Task.findByPk(taskId);
    return updatedTask;
  }

  // Fetch a single task by ID
  async getTask(taskId: number): Promise<TaskDTO | null> {
    return await Task.findOne({
          where: {
            task_name: {
                [Op.like]:  'Explorati'
            }
        }
    });
    // return await Task.findByPk(taskId);
  }
  
  async getAllTasks(): Promise<TaskDTO[]> {
    return await Task.findAll();
  }

  
  async getTaskHistory(taskId: number): Promise<TaskHistoryDTO[]> {
    const rows = await TaskHistory.findAll({
      where: { task_id: taskId },
      order: [['history_id', 'ASC']],
    });
    return rows.map((r) => r as TaskHistoryDTO);
  }
}


export default SequelizeTaskStore;
