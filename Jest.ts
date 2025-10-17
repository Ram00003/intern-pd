// app.controller.spec.ts 

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});



//app.service.ts

import { Injectable } from '@nestjs/common';

// =================== Interfaces ===================

interface IDataObject {
  a: number;
  b: string;
  c: object;
  d: any[];
  [key: string]: any;
}

interface ITypedArrayElement {
  a: boolean;
  b: number;
  c: string;
}

// =================== BaseClass ===================

abstract class BaseClass {
  private id: string;
  private key: string;
  private obj: IDataObject;

  constructor() {
    this.id = 'base-001';
    this.key = 'secret';
    this.obj = { a: 0, b: '', c: {}, d: [] };
  }

  abstract create(value: any): void;
  abstract read(): any;
  abstract update(key: string, value: any): void;
  abstract delete(key: string): void;
  abstract add(item: any): void;
  abstract remove(index: number): void;
  abstract updateItem(index: number, value: any): void;

  protected getObj(): IDataObject {
    return this.obj;
  }

  protected getId(): string {
    return this.id;
  }

  protected getKey(): string {
    return this.key;
  }

  protected setObjField(key: string, value: any): void {
    (this.obj as any)[key] = value;
  }

  protected setId(id: string): void {
    this.id = id;
  }

  protected setKey(key: string): void {
    this.key = key;
  }
}

// =================== Class A ===================

class A extends BaseClass {
  constructor() {
    super();
  }

  create(value: any): void {
    const key = `key_${Object.keys(this.getObj()).length}`;
    this.setObjField(key, value);
  }

  read(): any {
    return this.getObj();
  }

  update(key: string, value: any): void {
    const obj = this.getObj();
    if (key in obj) {
      this.setObjField(key, value);
    }
  }

  delete(key: string): void {
    const obj = this.getObj();
    if (key in obj) {
      delete (obj as any)[key];
    }
  }

  add(item: any): void {
    this.getObj().d.push(item);
  }

  remove(index: number): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr.splice(index, 1);
    }
  }

  updateItem(index: number, value: any): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr[index] = value;
    }
  }
}

// =================== Class B ===================

class B extends A {
  constructor() {
    super();
    this.setObjField('a', 1);
    this.setObjField('b', 'B-class');
    this.setObjField('c', {});
    this.setObjField('d', [
      { a: true, b: 10, c: 'x' },
      { a: false, b: 20, c: 'y' },
    ]);
  }

  add(item: ITypedArrayElement): void {
    this.getObj().d.push(item);
  }

  updateItem(index: number, value: ITypedArrayElement): void {
    const arr = this.getObj().d;
    if (index >= 0 && index < arr.length) {
      arr[index] = value;
    }
  }

  convertBooleanArrayToNumberArray(): number[] {
    return this.getObj().d.map(el => (el.a ? 1 : 0));
  }

  convertNumberArrayToBooleanArray(): boolean[] {
    return this.getObj().d.map(el => el.b !== 0);
  }

  setA(value: string | number): void {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      this.setObjField('a', Number(value));
    }
  }

  protected setB(value: string): void {
    this.setObjField('b', value.trim());
  }
}

// =================== Class C ===================

class C {
  private handler: B;

  constructor() {
    this.handler = new B();
  }

  performCRUD(): any {
    this.handler.create({ newKey: 'value1' });
    this.handler.create({ newKey: 'value2' });
    this.handler.update('b', 'Updated from ClassC');
    this.handler.delete('key_0');
    return this.handler.read();
  }

  performArrayOps(): any {
    this.handler.add({ a: true, b: 99, c: 'Added' });
    this.handler.updateItem(0, { a: false, b: 55, c: 'Modified' });
    this.handler.remove(1);
    return this.handler.read();
  }

  testConversions(): any {
    return {
      boolToNum: this.handler.convertBooleanArrayToNumberArray(),
      numToBool: this.handler.convertNumberArrayToBooleanArray(),
    };
  }

  getState(): any {
    return this.handler.read();
  }
}

// =================== NestJS Service ===================

@Injectable()
export class AppService {
  private c = new C();

  getHello(): string {
    return 'Welcome';
  }

  getCrudResult() {
    return this.c.performCRUD();
  }

  getArrayOpsResult() {
    return this.c.performArrayOps();
  }

  getConversionResult() {
    return this.c.testConversions();
  }

  getCurrentState() {
    return this.c.getState();
  }
}

//app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello(): string {
    return this.appService.getHello();
  }

  @Get('crud')
  performCrud() {
    return this.appService.getCrudResult();
  }

  @Get('array')
  performArrayOps() {
    return this.appService.getArrayOpsResult();
  }

  @Get('convert')
  performConversions() {
    return this.appService.getConversionResult();
  }

  @Get('state')
  getCurrentState() {
    return this.appService.getCurrentState();
  }
}
//app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// ===========================================
  // ✅ TEST CASES FOR AppController
  // ===========================================

  it('should return welcome message', () => {
    const result = appController.hello();
    expect(result).toBe('Welcome');
  });

  it('should return CRUD result object', () => {
    const result = appController.performCrud();
    expect(result).toHaveProperty('a');
    expect(result).toHaveProperty('b');
    expect(typeof result).toBe('object');
  });

  it('should return array operation result', () => {
    const result = appController.performArrayOps();
    expect(result).toHaveProperty('d');
    expect(Array.isArray(result.d)).toBe(true);
  });

  it('should return conversion result object', () => {
    const result = appController.performConversions();
    expect(result).toHaveProperty('boolToNum');
    expect(result).toHaveProperty('numToBool');
    expect(Array.isArray(result.boolToNum)).toBe(true);
    expect(Array.isArray(result.numToBool)).toBe(true);
  });

  it('should return current state object', () => {
    const result = appController.getCurrentState();
    expect(result).toHaveProperty('a');
    expect(result).toHaveProperty('b');
    expect(result).toHaveProperty('d');
  });
});
