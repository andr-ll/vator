import { v, validate } from '../src';

describe('types check errors', () => {
  it('throws error if provided type is not expected', () => {
    expect.assertions(10);

    const strError = () => validate(2, v.string);
    expect(strError).toThrow(
      "Validation failed: value has type 'number', but 'string' type is required.",
    );

    const numbError = () => validate('', v.number);
    expect(numbError).toThrow(
      "Validation failed: value has type 'string', but 'number' type is required.",
    );

    const dateError = () => validate('', v.Date);
    expect(dateError).toThrow(
      "Validation failed: could not convert value to 'Date'. Invalid value of type 'string' is used.",
    );

    const date2Error = () => validate({}, v.Date);
    expect(date2Error).toThrow(
      "Validation failed: could not convert value to 'Date'. Invalid value of type 'object' is used.",
    );

    const boolError = () => validate('', v.boolean);
    expect(boolError).toThrow(
      "Validation failed: value has type 'string', but 'boolean' type is required.",
    );

    const literalError = () => validate('', v.literal('foo', 'bar'));
    expect(literalError).toThrow(
      "Validation failed: value has type '', but 'foo | bar' type is required.",
    );

    const literalTypeError = () => validate(22, v.literal('foo', 'bar'));
    expect(literalTypeError).toThrow(
      "Validation failed: value has type 'number', but 'string' type is required.",
    );

    const nullError = () => validate('', v.null);
    expect(nullError).toThrow(
      "Validation failed: value has type 'string', but 'null' type is required.",
    );

    const arrayError = () => validate('', v.array(v.string));
    expect(arrayError).toThrow(
      "Validation failed: value has type 'string', but 'array' type is required.",
    );

    const objError = () => validate('', v.object({}));
    expect(objError).toThrow(
      "Validation failed: array item has type 'string', but 'object' type is required.",
    );
  });

  it('throws an error if array values have unexpected type', () => {
    expect.assertions(3);

    const arrayError = () => validate([2], v.array(v.string));
    expect(arrayError).toThrow(
      "Validation failed: array item has type 'number', but 'string' type is required.",
    );

    const array2Error = () =>
      validate([{ name: 22 }], v.array(v.object({ name: v.string })));
    expect(array2Error).toThrow(
      "Validation failed: key 'name' has type 'number', but 'string' type is required.",
    );

    const array3Error = () =>
      validate(
        [{ some: { name: 22 } }],
        v.array(v.object({ some: v.object({ name: v.string }) })),
      );
    expect(array3Error).toThrow(
      "Validation failed: key 'name' has type 'number', but 'string' type is required (at 'some').",
    );
  });

  it('throws an error if object keys have unexpected types', () => {
    expect.assertions(3);

    const objectError = () =>
      validate({ name: 22 }, v.object({ name: v.string }));
    expect(objectError).toThrow(
      "Validation failed: key 'name' has type 'number', but 'string' type is required.",
    );

    const object2Error = () =>
      validate({ name: 'foo' }, v.object({ name: v.string, age: v.number }));
    expect(object2Error).toThrow(
      "Validation failed: key 'age' is missing, but 'number' type is required.",
    );

    const object3Error = () =>
      validate(
        { name: 'foo', age: 22, data: { car: null } },
        v.object({
          name: v.string,
          age: v.number,
          data: v.object({ car: v.object({ model: v.string }) }),
        }),
      );
    expect(object3Error).toThrow(
      "Validation failed: key 'car' is missing, but 'object' type is required (at 'data').",
    );
  });
});

describe('types checks valid result', () => {
  it('checks that object has valid fields and does not throw an error', () => {
    expect.assertions(1);

    const data = {
      name: 'foo',
      age: 22,
      birthday: Date.now(),
      cars: [
        {
          model: 'bmw',
          year: 2017,
        },
        {
          model: 'audi',
          year: 2018,
        },
      ],
      married: true,
    };

    const errCheck = () =>
      validate(data, {
        name: v.string,
        age: v.number,
        birthday: v.Date,
        cars: v.array(
          v.object({
            model: v.literal('bmw', 'audi'),
            year: v.number,
          }),
        ),
        married: v.boolean,
      });

    expect(errCheck).not.toThrow();
  });
});
