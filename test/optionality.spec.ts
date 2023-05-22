import { buildSchema, v, validate } from '../src';

describe('optionality check', () => {
  it('throws error if unexpected optionality is present', () => {
    expect.assertions(3);

    const undefinedError = () => validate(undefined, v.nullable.string);
    expect(undefinedError).toThrow(
      "Validation failed: value has type 'undefined', but 'string | null' type is required.",
    );

    const nullError = () => validate(null, v.optional.string);
    expect(nullError).toThrow(
      "Validation failed: value has type 'null', but 'string | undefined' type is required.",
    );

    const typeError = () => validate(2, v.maybe.string);
    expect(typeError).toThrow(
      "Validation failed: value has type 'number', but 'string | null | undefined' type is required.",
    );
  });

  it('pass validation if valid type is present', () => {
    expect.assertions(7);

    const undefinedPass = () => validate(undefined, v.optional.string);
    expect(undefinedPass).not.toThrow();

    const nullPass = () => validate(null, v.nullable.string);
    expect(nullPass).not.toThrow();

    const nullMaybePass = () => validate(null, v.maybe.string);
    expect(nullMaybePass).not.toThrow();

    const undefinedMaybePass = () => validate(undefined, v.maybe.string);
    expect(undefinedMaybePass).not.toThrow();

    const unknownPass = () => validate(undefined, v.unknown);
    expect(unknownPass).not.toThrow();

    const optionalObjectPass = () => validate(undefined, v.optional.object({}));
    expect(optionalObjectPass).not.toThrow();

    const optionalArrayPass = () => validate(null, v.maybe.array(v.string));
    expect(optionalArrayPass).not.toThrow();
  });

  it('builds valid schema and converts numerical date to date object', () => {
    expect.assertions(1);

    const { schema } = buildSchema({
      name: v.maybe.string,
      age: v.maybe.number,
      date: v.optional.Date,
    });

    const input = { date: Date.now() };
    validate(input, schema);

    expect(input.date).toBeInstanceOf(Date);
  });
});
