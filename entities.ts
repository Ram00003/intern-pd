import { TaskDTO } from "./dto/task.dto";
import { TaskHistoryDTO } from "./dto/taskHistory.dto";

export interface taskStore{
    createTask(task: TaskDTO) : TaskDTO;
    updateTask(taskId: number, task: TaskDTO) : TaskDTO;
    getTask(taskId: number) : TaskDTO | null;
    getAlltasks() : TaskDTO[];
    getTaskHistory(taskId: number) : TaskHistoryDTO[];
    deleteTask(taskId: number) : boolean;
}

export class taskStorage implements taskStore {
    tasksMap = new Map<number, TaskDTO>();          // creating a Key Value pair using Map where key is task_id and value is taskDTO
    taskHistoryMap = new Map<number, TaskHistoryDTO>(); // creating a Key Value pair using Map where key is task_id and value is taskHistoryDTO
    nextTaskId = 1; // Task_id starts 1, increases by 1 for new tasks
    nextHistoryId = 1; // history_id starts with 1, increases by 1 for new updates
    
    // create a task
    createTask(task: TaskDTO): TaskDTO {
       const taskId = this.nextTaskId++;
        const newTask: TaskDTO = {
            ...task,
            task_id: taskId,
            created_at: task.created_at = new Date(),
        };
        this.tasksMap.set(taskId, newTask);

        const newTaskHistory: TaskHistoryDTO = {
        const newTaskHistoryId: number = this.nextHistoryId++;
        }
        return newTask;

        
    }

   // Get Single task by ID

    getTask(taskId: number): TaskDTO | null {
    if (this.tasksMap.has(taskId)) {
            return this.tasksMap.get(taskId) as TaskDTO; 
        } else {
            return null;
        }
    }

  // Retrieve all tasks
    getAllTasks(): TaskDTO[] {
    const tasksArray: TaskDTO[] = []; // saving all tasks in an array

    // Iterating over all tasks in the map
    for (const task of this.tasksMap.values()) {
        tasksArray.push(task); // Add each task to the array
    }
    return tasksArray;
}
    

    getTaskHistory(taskId: number): TaskHistoryDTO[] {
        
    }


    deleteTask(taskid: number): boolean {
        
    }

}

