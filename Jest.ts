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




//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
    .setTitle('Typescript Task')
    .setDescription('Service API implemented via interface definitions and classes')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
// Current app.controller.ts
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

/*
Nice — you already have working endpoints. I’ll walk you through a beginner-friendly, copy-pasteable step-by-step to add Swagger docs to them.

I’ll keep it minimal: install, configure (you already did most of this), add simple decorators to the controller, optionally add DTOs for nicer response schemas, run and view. Ready? Let’s go.

1) Install the Swagger package

(If already installed, skip.)

npm install @nestjs/swagger swagger-ui-express

2) Ensure Swagger setup in main.ts

You showed this earlier — it’s correct. Minimal recommended form (paste into main.ts if not present):

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Typescript Task')
    .setDescription('Service API implemented via interface definitions and classes')
    .setVersion('1.0')
    .addTag('OOP')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

Swagger UI will be available at http://localhost:3000/api.


3) Add Swagger decorators to your controller (simple step)

Open your app.controller.ts and add imports from @nestjs/swagger and lightweight decorators. Replace the file content with this exact code (easy copy-paste):

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('OOP')                       // groups endpoints in Swagger UI
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Return welcome message' })
  @ApiResponse({ status: 200, description: 'Simple welcome string.' })
  hello(): string {
    return this.appService.getHello();
  }

  @Get('crud')
  @ApiOperation({ summary: 'Perform CRUD and return object snapshot' })
  @ApiResponse({ status: 200, description: 'Object after CRUD operations.' })
  performCrud() {
    return this.appService.getCrudResult();
  }

  @Get('array')
  @ApiOperation({ summary: 'Perform array operations and return object' })
  @ApiResponse({ status: 200, description: 'Object after array changes.' })
  performArrayOps() {
    return this.appService.getArrayOpsResult();
  }

  @Get('convert')
  @ApiOperation({ summary: 'Run conversions on internal data' })
  @ApiResponse({ status: 200, description: 'Converted arrays (boolean↔number).' })
  performConversions() {
    return this.appService.getConversionResult();
  }

  @Get('state')
  @ApiOperation({ summary: 'Return current internal object state' })
  @ApiResponse({ status: 200, description: 'Current object snapshot.' })
  getCurrentState() {
    return this.appService.getCurrentState();
  }
}

That’s all you need to get readable route names and descriptions in Swagger.

4) (Optional but recommended) Add DTOs so Swagger shows response schema

Create a small DTO file src/dto/crud-response.dto.ts (example):

// src/dto/crud-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TypedArrayElemDto {
  @ApiProperty({ example: true })
  a: boolean;

  @ApiProperty({ example: 10 })
  b: number;

  @ApiProperty({ example: 'x' })
  c: string;
}

export class CrudResponseDto {
  @ApiProperty({ example: 1 })
  a: number;

  @ApiProperty({ example: 'B-class' })
  b: string;

  @ApiProperty({ example: {} })
  c: object;

  @ApiProperty({ type: [TypedArrayElemDto], example: [{ a: true, b: 10, c: 'x' }] })
  d: TypedArrayElemDto[];

  // optional: allow additional keys (Swagger UI will still show these properties)
}

Then annotate the controller endpoint with the DTO:

import { CrudResponseDto } from './dto/crud-response.dto';

// ...
  @Get('crud')
  @ApiOperation({ summary: 'Perform CRUD and return object snapshot' })
  @ApiResponse({ status: 200, description: 'Object after CRUD operations.', type: CrudResponseDto })
  performCrud() {
    return this.appService.getCrudResult();
  }

Repeat @ApiResponse({ type: CrudResponseDto }) for array and state endpoints if they return the same object structure.

5) (Optional) If any endpoints accept request bodies (POST/PUT), use @ApiBody() and DTOs with validation decorators — but you don’t have those now.

6) Rebuild & run

npm run start:dev
# open
http://localhost:3000/api

You should see:

Title and description you set

Group "OOP" with your endpoints

Per-endpoint summary and response description

DTO schema if you added DTOs


7) Quick tips & FAQ (beginner)

If Swagger UI shows unhelpful types (“object”), add DTOs and use @ApiProperty() to give examples.

Use .setVersion('1.0') in DocumentBuilder() to show API version.

If you want the raw JSON spec, add fs.writeFileSync('./swagger.json', JSON.stringify(document)) after createDocument().



---

If you want, I can:

generate the exact DTO files for each endpoint and paste the updated controller with imports, or

show how to document response examples for performConversions() (it returns two arrays) — quick and useful.


Which of those would you like next?

*/

//crud-state.dto

import { ApiProperty } from '@nestjs/swagger';

export class TypedArrayElementDto {
  @ApiProperty({ example: true, description: 'Boolean flag value' })
  a: boolean;

  @ApiProperty({ example: 10, description: 'Numeric field inside array element' })
  b: number;

  @ApiProperty({ example: 'x', description: 'String field inside array element' })
  c: string;
}

export class CrudStateResponseDto {
  @ApiProperty({ example: 1, description: 'Numeric field a of main object' })
  a: number;

  @ApiProperty({ example: 'Updated from ClassC', description: 'String field b of main object' })
  b: string;

  @ApiProperty({ example: {}, description: 'Nested object field c' })
  c: object;

  @ApiProperty({
    type: [TypedArrayElementDto],
    description: 'Array of elements with boolean, number, and string fields',
    example: [
      { a: true, b: 10, c: 'x' },
      { a: false, b: 20, c: 'y' },
    ],
  })
  d: TypedArrayElementDto[];
}
//convert dto
import { ApiProperty } from '@nestjs/swagger';

export class ConversionResponseDto {
  @ApiProperty({
    example: [1, 0, 1],
    description: 'Result of converting boolean array to number array (true→1, false→0)',
  })
  boolToNum: number[];

  @ApiProperty({
    example: [true, true, false],
    description: 'Result of converting number array to boolean array (non-zero→true)',
  })
  numToBool: boolean[];
}

// latest controller.ts

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CrudStateResponseDto } from './dto/crud-state.dto';
import { ArrayResponseDto } from './dto/array-response.dto';
import { ConversionResponseDto } from './dto/conversion-response.dto';

@ApiTags('OOP Controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('crud')
  @ApiOperation({ summary: 'Perform CRUD and return object snapshot' })
  @ApiResponse({ status: 200, description: 'Object updated successfully after CRUD operations.', type: CrudStateResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input or key provided.' })
  @ApiResponse({ status: 500, description: 'Internal server error while performing CRUD.' })
  performCrud() {
    return this.appService.getCrudResult();
  }

  @Get('array')
  @ApiOperation({ summary: 'Perform array operations and return object' })
  @ApiResponse({ status: 200, description: 'Array operations executed successfully.', type: ArrayResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid array index or data type provided.' })
  @ApiResponse({ status: 500, description: 'Internal error during array manipulation.' })
  performArrayOps() {
    return this.appService.getArrayOpsResult();
  }

  @Get('convert')
  @ApiOperation({ summary: 'Perform type conversions on internal array' })
  @ApiResponse({ status: 200, description: 'Type conversion completed successfully.', type: ConversionResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid data or unsupported conversion format.' })
  @ApiResponse({ status: 422, description: 'Data cannot be converted due to incompatible types.' })
  @ApiResponse({ status: 500, description: 'Unexpected error during data conversion.' })
  performConversions() {
    return this.appService.getConversionResult();
  }

  @Get('state')
  @ApiOperation({ summary: 'Return current internal object state' })
  @ApiResponse({ status: 200, description: 'Current object state retrieved successfully.', type: CrudStateResponseDto })
  @ApiResponse({ status: 404, description: 'Object not found for given ID.' })
  @ApiResponse({ status: 500, description: 'Internal server error while fetching state.' })
  getCurrentState() {
    return this.appService.getCurrentState();
  }
}
