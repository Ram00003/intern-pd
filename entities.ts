src/dto/
task.dto.ts

import { TaskStatus } from '../enums/taskStatus.enum';
import { Priority } from '../enums/priority.enum';

export class TaskDTO {
  task_id?: number;
  task_name: string;
  task_description?: string;
  predecessor?: number;
  task_status: TaskStatus;
  planned_start?: Date;
  planned_end?: Date;
  actual_start?: Date;
  actual_end?: Date;
  priority: Priority;
  assigned_to?: number;
  assigned_by?: number;
  assigned_at?: Date;
  task_order?: number;
  created_by: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  deleted_at?: Date;
  deleted_by?: number;

  constructor(
    task_name: string,
    task_status: TaskStatus,
    priority: Priority,
    created_by: number,
    task_id?: number,
    task_description?: string,
    predecessor?: number,
    planned_start?: Date,
    planned_end?: Date,
    actual_start?: Date,
    actual_end?: Date,
    assigned_to?: number,
    assigned_by?: number,
    assigned_at?: Date,
    task_order?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date,
    deleted_at?: Date,
    deleted_by?: number,
  ) {
    this.task_id = task_id;
    this.task_name = task_name;
    this.task_description = task_description;
    this.predecessor = predecessor;
    this.task_status = task_status;
    this.planned_start = planned_start;
    this.planned_end = planned_end;
    this.actual_start = actual_start;
    this.actual_end = actual_end;
    this.priority = priority;
    this.assigned_to = assigned_to;
    this.assigned_by = assigned_by;
    this.assigned_at = assigned_at;
    this.task_order = task_order;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.deleted_by = deleted_by;
  }
}
taskHistory.dto.ts
import { TaskStatus } from '../enums/taskStatus.enum';
import { Priority } from '../enums/priority.enum';

export class TaskHistoryDTO {
  history_id?: number;
  task_id: number;
  task_name?: string;
  task_description?: string;
  predecessor?: number;
  task_status?: TaskStatus;
  planned_start?: Date;
  planned_end?: Date;
  actual_start?: Date;
  actual_end?: Date;
  priority?: Priority;
  assigned_to?: number;
  assigned_by?: number;
  assigned_at?: Date;
  task_order?: number;
  created_by?: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  deleted_at?: Date;
  deleted_by?: number;

  constructor(
    task_id: number,
    task_name?: string,
    task_status?: TaskStatus,
    priority?: Priority,
    history_id?: number,
    task_description?: string,
    predecessor?: number,
    planned_start?: Date,
    planned_end?: Date,
    actual_start?: Date,
    actual_end?: Date,
    assigned_to?: number,
    assigned_by?: number,
    assigned_at?: Date,
    task_order?: number,
    created_by?: number,
    created_at?: Date,
    updated_by?: number,
    updated_at?: Date,
    deleted_at?: Date,
    deleted_by?: number,
  ) {
    this.history_id = history_id;
    this.task_id = task_id;
    this.task_name = task_name;
    this.task_description = task_description;
    this.predecessor = predecessor;
    this.task_status = task_status;
    this.planned_start = planned_start;
    this.planned_end = planned_end;
    this.actual_start = actual_start;
    this.actual_end = actual_end;
    this.priority = priority;
    this.assigned_to = assigned_to;
    this.assigned_by = assigned_by;
    this.assigned_at = assigned_at;
    this.task_order = task_order;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_by = updated_by;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.deleted_by = deleted_by;
  }
}

user.dto.ts
export class UserDTO {
  user_id?: number;
  user_name: string;
  email: string;

  constructor(user_name: string, email: string, user_id?: number) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.email = email;
  }
}

src/enums/
priority.enum.ts
export enum Priority {
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
}
src/enums/taskStatus.enum.ts
export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
  Deleted = 'deleted',
}


src/models/task.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { TaskStatus } from '../enums/taskStatus.enum';
import { Priority } from '../enums/priority.enum';
import { IDatabaseConfigAttributes } from '../stores/database-implementation/IDatabaseConfigAttributes'

@Table({
  tableName: 'tasks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: false, // can be enabled if we want to automatically assign values
  underscored: true,
})



export class Task extends Model<IDatabaseConfigAttributes, IDatabaseConfigAttributes> implements IDatabaseConfigAttributes{
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, field: 'task_id' })
  task_id!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255), field: 'task_name' })
  task_name!: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT, field: 'task_description' })
  task_description?: string;

  @AllowNull(true)
  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, field: 'predecessor' })
  predecessor?: number;

  @BelongsTo(() => Task, 'predecessor')
  predecessorTask?: Task;

  @HasMany(() => Task, 'predecessor')
  dependents?: Task[];

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    field: 'task_status',
  })
  task_status!: TaskStatus;

  @AllowNull(true)
  @Column({ type: DataType.DATEONLY, field: 'planned_start' })
  planned_start?: Date;

  @AllowNull(true)
  @Column({ type: DataType.DATEONLY, field: 'planned_end' })
  planned_end?: Date;

  @AllowNull(true)
  @Column({ type: DataType.DATEONLY, field: 'actual_start' })
  actual_start?: Date;

  @AllowNull(true)
  @Column({ type: DataType.DATEONLY, field: 'actual_end' })
  actual_end?: Date;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(Priority)),
    field: 'priority',
  })
  priority!: Priority;

  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'assigned_to' })
  assigned_to?: number;

  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'assigned_by' })
  assigned_by?: number;

  @AllowNull(true)
  @Column({ type: DataType.DATE, field: 'assigned_at' })
  assigned_at?: Date;

  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'task_order' })
  task_order?: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'created_by' })
  created_by!: number;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at?: Date;

  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'updated_by' })
  updated_by?: number;

  @AllowNull(true)
  @Column({ type: DataType.DATE, field: 'updated_at' })
  updated_at?: Date;

  @AllowNull(true)
  @Column({ type: DataType.DATE, field: 'deleted_at' })
  deleted_at?: Date;

  @AllowNull(true)
  @Column({ type: DataType.INTEGER, field: 'deleted_by' })
  deleted_by?: number;
}

src/stores/database-implementation/IDatabaseConfigAttributes.ts
import { Priority } from "src/enums/priority.enum";
import { TaskStatus } from "src/enums/taskStatus.enum";

export interface IDatabaseConfigAttributes {
  task_id?: number;
  task_name: string;
  task_description?: string;
  predecessor?: number;
  task_status: TaskStatus;
  planned_start?: Date;
  planned_end?: Date;
  actual_start?: Date;
  actual_end?: Date;
  priority: Priority;
  assigned_to?: number;
  assigned_by?: number;
  assigned_at?: Date;
  task_order?: number;
  created_by: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  deleted_at?: Date;
  deleted_by?: number;
}
src/stores/database-implementation/sequelize-task-store.ts
import { TaskStore } from "../task-store.interface";
import { TaskDTO } from "src/dto/task.dto";
import { TaskHistoryDTO } from "src/dto/taskHistory.dto";
import { UserDTO } from "src/dto/user.dto";
import { Task } from "src/models/task.model";


class SequelizeTaskStore implements TaskStore {

  async createTask(task: TaskDTO): Promise<TaskDTO> {
    const createdTask = await Task.create(task);
    return createdTask;
  }

  async updateTask(taskId: number, task: TaskDTO): Promise<TaskDTO> {
    await Task.update(task, { where: { task_id: taskId } });
    const updatedTask = await Task.findByPk(taskId);
    return updatedTask!;
  }

  async getTask(taskId: number): Promise<TaskDTO | null> {
    return await Task.findByPk(taskId);
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    return await Task.findAll();
  }

  async getTaskHistory(taskId: number): Promise<TaskHistoryDTO[]> {
    return await TaskHistoryDto[].findAll({ where: { task_id: taskId } });
  }
}

export default SequelizeTaskStore;
src/stores/in-memory/task-store.interface.ts
import { TaskDTO } from '../dto/task.dto';
import { TaskHistoryDTO } from '../dto/taskHistory.dto';

export interface TaskStore {
  createTask(task: TaskDTO): Promise<TaskDTO>;
  updateTask(taskId: number, task: TaskDTO): Promise<TaskDTO>;
  getTask(taskId: number): Promise<TaskDTO | null>;
  getAllTasks(): Promise<TaskDTO[]>;
  getTaskHistory(taskId: number): Promise<TaskHistoryDTO[]>;
}

src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './models/task.model';
import { IDatabaseConfigAttributes } from 'src/stores/database-implementation/IDatabaseConfigAttributes';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1', 
      port: 3306,
      username: 'root', 
      password: '3630', 
      database: 'taskmanager',
      models: [Task],
      autoLoadModels: false,
      synchronize: false, 
      logging: false,
      define: { underscored: true },
    }),
    SequelizeModule.forFeature([Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




