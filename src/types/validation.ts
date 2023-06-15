import {
  ArraySchemaType,
  LiteralSchemaType,
  ObjectSchemaType,
  Optionality,
  PrimitivesSchemaType,
  ValidationSchema,
  Values,
} from './schema';

type isOptional<T, O extends Optionality> = O extends 'required'
  ? T
  : O extends 'optional'
  ? T | undefined
  : O extends 'nullable'
  ? T | null
  : O extends 'maybe'
  ? T | null | undefined
  : never;

type LiteralToTypes = {
  string: string;
  number: number;
  boolean: boolean;
  Date: Date;
  unknown: unknown;
  null: null;
};

type ArrayTypeValidation<V extends Values> = V extends PrimitivesSchemaType
  ? Array<isOptional<LiteralToTypes[V['type']], V['optionality']>>
  : V extends ObjectSchemaType
  ? Array<isOptional<ValidationResult<V['schema']>, V['optionality']>>
  : V extends ArraySchemaType
  ? Array<isOptional<ArrayTypeValidation<V['values']>, V['optionality']>>
  : never;

type Validate<V extends Values> = V extends PrimitivesSchemaType
  ? LiteralToTypes[V['type']]
  : V extends ObjectSchemaType
  ? ValidationResult<V['schema']>
  : V extends ArraySchemaType
  ? ArrayTypeValidation<V['values']>
  : V extends LiteralSchemaType
  ? V['literals'][number]
  : never;

export type ValidationResult<Schema extends ValidationSchema | Values> =
  Schema extends ValidationSchema
    ? {
        [K in keyof Schema]: isOptional<
          Validate<Schema[K]>,
          Schema[K]['optionality']
        >;
      }
    : Schema extends Values
    ? isOptional<Validate<Schema>, Schema['optionality']>
    : never;

export type ValidatorOptions<S extends ValidationSchema | Values> = {
  schema: S;
  key?: string;
  parentKeys?: string[];
  value: unknown;
};
