import {
  ArraySchemaType,
  ArrayType,
  LiteralSchemaType,
  LiteralType,
  Literals,
  ObjectSchemaType,
  ObjectType,
  Optionality,
  PrimitiveTypes,
  PrimitivesSchemaType,
  ValidationSchema,
  Values,
} from './types';

export class PrimitivesSchema<T extends PrimitiveTypes, O extends Optionality>
  implements PrimitivesSchemaType
{
  constructor(
    public type: T,
    public optionality: O,
  ) {}
}

export class ObjectSchema<O extends Optionality, S extends ValidationSchema> implements ObjectSchemaType {
  public type: ObjectType = 'object';

  constructor(
    public optionality: O,
    public schema: S,
  ) {}
}

export class ArraySchema<O extends Optionality, V extends Values> implements ArraySchemaType {
  public type: ArrayType = 'array';

  constructor(
    public optionality: O,
    public values: V,
  ) {}
}

export class LiteralSchema<O extends Optionality, L extends Literals> implements LiteralSchemaType {
  public type: LiteralType = 'literal';

  constructor(
    public optionality: O,
    public literals: L,
  ) {}
}
