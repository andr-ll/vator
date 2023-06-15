import { OptionalKeys, Optionality, ValidationSchema, Values } from './types';
import {
  ArraySchema,
  LiteralSchema,
  ObjectSchema,
  PrimitivesSchema,
} from './schema';

export class Vator<O extends Optionality> {
  private static _optionalV: Omit<Vator<'optional'>, OptionalKeys> = new Vator(
    'optional',
  );
  private static _nullableV: Omit<Vator<'nullable'>, OptionalKeys> = new Vator(
    'nullable',
  );
  private static _maybeV: Omit<Vator<'maybe'>, OptionalKeys> = new Vator(
    'maybe',
  );

  constructor(private _optionality: O) {}

  get optional() {
    return Vator._optionalV;
  }

  get nullable() {
    return Vator._nullableV;
  }

  get maybe() {
    return Vator._maybeV;
  }

  get string() {
    const optional = this._optionality;
    return new PrimitivesSchema('string', optional);
  }

  get number() {
    const optional = this._optionality;
    return new PrimitivesSchema('number', optional);
  }

  get boolean() {
    const optional = this._optionality;
    return new PrimitivesSchema('boolean', optional);
  }

  get null() {
    const optional = this._optionality;
    return new PrimitivesSchema('null', optional);
  }

  get Date() {
    const optional = this._optionality;
    return new PrimitivesSchema('Date', optional);
  }

  get unknown() {
    const optional = this._optionality;
    return new PrimitivesSchema('unknown', optional);
  }

  object<S extends ValidationSchema>(schema: S) {
    const optional = this._optionality;
    return new ObjectSchema(optional, schema);
  }

  array<V extends Values>(values: V) {
    const optional = this._optionality;
    return new ArraySchema(optional, values);
  }

  literal<L extends string>(...values: L[]) {
    const optional = this._optionality;
    return new LiteralSchema(optional, values);
  }
}

export const v = new Vator('required');
