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
  constructor(public type: T, public optional: O) {}
}

export class ObjectSchema<
  T extends ObjectType,
  O extends Optionality,
  S extends ValidationSchema,
> implements ObjectSchemaType
{
  public type: T;

  constructor(public optional: O, public schema: S) {
    this.type = 'object' as T;
  }
}

export class ArraySchema<
  T extends ArrayType,
  O extends Optionality,
  V extends Values,
> implements ArraySchemaType
{
  public type: T;

  constructor(public optional: O, public values: V) {
    this.type = 'array' as T;
  }
}

export class LiteralSchema<
  T extends LiteralType,
  O extends Optionality,
  L extends Literals,
> implements LiteralSchemaType
{
  public type: T;

  constructor(public optional: O, public literals: L) {
    this.type = 'literal' as T;
  }
}
