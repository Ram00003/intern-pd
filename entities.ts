createTask(task: TaskDTO): TaskDTO {
    const taskId = this.nextTaskId++;
    const newTask: TaskDTO = {
        ...task,
        task_id: taskId,
        created_at: new Date(),
    };

    this.tasksMap.set(taskId, newTask);

    // --- record task creation in history ---
    const historyRecord: TaskHistoryDTO = {
        history_id: this.nextHistoryId++,
        task_id: taskId,
        task_name: task.task_name,
        task_description: task.task_description,
        predecessor: task.predecessor,
        task_status: task.task_status,
        planned_start: task.planned_start,
        planned_end: task.planned_end,
        actual_start: task.actual_start,
        actual_end: task.actual_end,
        priority: task.priority,
        assigned_to: task.assigned_to,
        assigned_by: task.assigned_by,
        assigned_at: task.assigned_at,
        task_order: task.task_order,
        created_by: task.created_by,
        created_at: new Date(),
        updated_by: task.updated_by,
        updated_at: task.updated_at,
    };

    // Initialize the history array for this task
    this.taskHistoryMap.set(taskId, [historyRecord]);

    return newTask;
}



updateTask(taskId: number, task: TaskDTO): TaskDTO {
    const existingTask = this.tasksMap.get(taskId);
    if (!existingTask) {
        throw new Error(`Task with ID ${taskId} not found`);
    }

    const updatedTask: TaskDTO = {
        ...existingTask,
        ...task,
        updated_at: new Date(),
    };

    this.tasksMap.set(taskId, updatedTask);

    // --- record task update in history ---
    const newHistory: TaskHistoryDTO = {
        history_id: this.nextHistoryId++,
        task_id: taskId,
        task_name: updatedTask.task_name,
        task_description: updatedTask.task_description,
        predecessor: updatedTask.predecessor,
        task_status: updatedTask.task_status,
        planned_start: updatedTask.planned_start,
        planned_end: updatedTask.planned_end,
        actual_start: updatedTask.actual_start,
        actual_end: updatedTask.actual_end,
        priority: updatedTask.priority,
        assigned_to: updatedTask.assigned_to,
        assigned_by: updatedTask.assigned_by,
        assigned_at: updatedTask.assigned_at,
        task_order: updatedTask.task_order,
        created_by: updatedTask.created_by,
        created_at: updatedTask.created_at,
        updated_by: updatedTask.updated_by,
        updated_at: updatedTask.updated_at,
    };

    const historyArray = this.taskHistoryMap.get(taskId) || [];
    historyArray.push(newHistory);
    this.taskHistoryMap.set(taskId, historyArray);

    return updatedTask;
}


getTaskHistory(taskId: number): TaskHistoryDTO[] {
    return this.taskHistoryMap.get(taskId) || [];
}
