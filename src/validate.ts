import { ValidationError } from './error';
import {
  ArraySchema,
  LiteralSchema,
  ObjectSchema,
  PrimitivesSchema,
} from './schema';
import {
  ValidationSchema,
  ValidationResult,
  Values,
  ArraySchemaType,
  ValidatorOptions,
} from './types';

enum OptionalityByKey {
  optional = 'undefined',
  nullable = 'null',
  maybe = 'null | undefined'
}

const pickValidator =
  ({
    schema,
    parentKeys,
    key,
  }: Omit<ValidatorOptions<ValidationSchema | Values>, 'value'>) =>
    (value: unknown) => {
      return schema instanceof PrimitivesSchema
        ? validateBasic({ value, schema, key, parentKeys })
        : schema instanceof ArraySchema
          ? validateArray({ value, schema, parentKeys })
          : schema instanceof ObjectSchema
            ? validateObject({ value, schema, parentKeys })
            : schema instanceof LiteralSchema
              ? validateBasic({ value, schema, key, parentKeys })
              : validateObject({ value, schema, parentKeys });
    };

function validateObject({
  value: obj,
  schema,
  parentKeys = [],
}: Omit<ValidatorOptions<ValidationSchema | Values>, 'key'>): unknown {
  if (schema instanceof ObjectSchema) {
    const optional = checkOptionality(schema, obj);
    if (optional) return optional.value;

    return validateObject({ schema: schema.schema, value: obj, parentKeys });
  }

  const received = typeof obj;

  if (received !== 'object' || obj === null) {
    throw new ValidationError({ expected: 'object', received, parentKeys });
  }

  const object = obj as Record<string, unknown>;
  const validationSchema = schema as ValidationSchema;

  for (const key in validationSchema) {
    const valueSchema = validationSchema[key];
    const value = object[key];
    const expected = valueSchema.type;

    const optional = checkOptionality(valueSchema, value);
    if (optional) continue;

    if (value == null && expected !== 'unknown') {
      throw new ValidationError({
        key,
        expected,
        received: 'missing',
        parentKeys,
      });
    }

    const validator = pickValidator({
      key,
      schema: valueSchema,
      parentKeys: [...parentKeys, key],
    });

    object[key] = validator(value);
  }

  return object;
}

function validateArray({
  schema,
  value: arr,
  parentKeys,
}: Omit<ValidatorOptions<ArraySchemaType>, 'key'>) {
  const optional = checkOptionality(schema, arr);
  if (optional) return optional.value;

  if (!Array.isArray(arr)) {
    throw new ValidationError({
      key: 'single value',
      parentKeys,
      expected: 'array',
      received: typeof arr,
    });
  }

  const schemaType = schema.values;

  arr.forEach((item, id) => {
    const validator = pickValidator({
      schema: schemaType,
      parentKeys,
      key: 'array item',
    });
    arr[id] = validator(item);
  });

  return arr;
}

function validateBasic({
  schema,
  value: item,
  key,
  parentKeys,
}: ValidatorOptions<Values>) {
  const optional = checkOptionality(schema, item);
  if (optional) return optional.value;

  key = key ?? 'single value';
  parentKeys = parentKeys?.filter((i) => i !== key);
  const received = item === null ? 'null' : typeof item;

  if (schema.type === 'literal') {
    if (typeof item !== 'string') {
      throw new ValidationError({
        key,
        expected: 'string',
        received,
        parentKeys,
      });
    }

    if (!schema.literals.includes(item)) {
      throw new ValidationError({
        key,
        expected: schema.literals.join(' | '),
        received: item,
        parentKeys,
      });
    }

    return item;
  }

  if (schema.type === 'Date') {
    const seconds =
      typeof item === 'string'
        ? Date.parse(String(item))
        : typeof item === 'number'
          ? item
          : NaN;

    if (Number.isNaN(seconds)) {
      throw new ValidationError({
        key,
        expected: 'Date',
        received,
        parentKeys,
        convertFailed: true,
      });
    }

    return new Date(seconds);
  }

  const expected = schema.optional !== 'required' ? `${schema.type} | ${OptionalityByKey[schema.optional]}` : schema.type;

  if (received !== schema.type && schema.type !== 'unknown') {
    throw new ValidationError({
      key,
      expected,
      received,
      parentKeys,
    });
  }

  return item;
}

function checkOptionality(
  schema: ValidatorOptions<Values>['schema'],
  value: unknown,
) {
  if (schema.optional === 'required') return;

  if (schema.optional === 'optional' && value === undefined) {
    return { value };
  }

  if (schema.optional === 'nullable' && value === null) {
    return { value };
  }

  if (schema.optional === 'maybe' && value == null) {
    return { value };
  }

  return;
}

/**
 * A function which creates valid `schema` for validation and `ResultType`.
 * `ResultType` is an empty object, should be used as `typeof ResultType` only!
 *
 * @param schema ValidationSchema object which the `data` will be check against with
 */
export function buildSchema<S extends ValidationSchema | Values>(schema: S) {
  return { schema, ResultType: {} as ValidationResult<S> };
}

export function validate<S extends ValidationSchema | Values>(
  data: unknown,
  schema: S,
): asserts data is ValidationResult<S> {
  const validator = pickValidator({ schema });

  validator(data);
}
