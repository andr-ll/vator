export type PrimitiveTypes =
  | 'string'
  | 'number'
  | 'boolean'
  | 'unknown'
  | 'null'
  | 'Date';

export type ObjectType = 'object';
export type ArrayType = 'array';
export type LiteralType = 'literal';

type KeyType = string | number | symbol;

export type Optionality = 'required' | 'nullable' | 'optional' | 'maybe';

export type PrimitivesSchemaType = {
  type: PrimitiveTypes;
  optional: Optionality;
};

export type Literals = string[];

export type LiteralSchemaType = {
  type: LiteralType;
  optional: Optionality;
  literals: Literals;
};

export type ObjectSchemaType = {
  type: ObjectType;
  optional: Optionality;
  schema: ValidationSchema;
};

export type ArraySchemaType = {
  type: ArrayType;
  optional: Optionality;
  values: Values;
};

export type Values =
  | PrimitivesSchemaType
  | ObjectSchemaType
  | ArraySchemaType
  | LiteralSchemaType;

export type ValidationSchema = {
  [key: KeyType]: Values;
};
