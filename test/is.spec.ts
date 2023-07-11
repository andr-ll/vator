import { is } from '../src';

describe('"is" validator tests', () => {
  it('checks that value is undefined', () => {
    expect.assertions(8);
    expect(is.undefined(null)).toEqual(false);
    expect(is.undefined({})).toEqual(false);
    expect(is.undefined([])).toEqual(false);
    expect(is.undefined(NaN)).toEqual(false);
    expect(is.undefined(1)).toEqual(false);
    expect(is.undefined('')).toEqual(false);
    expect(is.undefined(true)).toEqual(false);

    expect(is.undefined(undefined)).toEqual(true);
  });

  it('checks that value is null', () => {
    expect.assertions(8);
    expect(is.null({})).toEqual(false);
    expect(is.null([])).toEqual(false);
    expect(is.null(NaN)).toEqual(false);
    expect(is.null(1)).toEqual(false);
    expect(is.null('')).toEqual(false);
    expect(is.null(true)).toEqual(false);
    expect(is.null(undefined)).toEqual(false);

    expect(is.null(null)).toEqual(true);
  });

  it('checks that value is nullable', () => {
    expect.assertions(8);
    expect(is.nullable({})).toEqual(false);
    expect(is.nullable([])).toEqual(false);
    expect(is.nullable(NaN)).toEqual(false);
    expect(is.nullable(1)).toEqual(false);
    expect(is.nullable('')).toEqual(false);
    expect(is.nullable(true)).toEqual(false);

    expect(is.nullable(undefined)).toEqual(true);
    expect(is.nullable(null)).toEqual(true);
  });

  it('checks that value is string', () => {
    expect.assertions(9);
    expect(is.string({})).toEqual(false);
    expect(is.string([])).toEqual(false);
    expect(is.string(NaN)).toEqual(false);
    expect(is.string(1)).toEqual(false);
    expect(is.string(true)).toEqual(false);
    expect(is.string(undefined)).toEqual(false);
    expect(is.string(null)).toEqual(false);

    expect(is.string('')).toEqual(false);
    expect(is.string('valid')).toEqual(true);
  });

  it('checks that value is number', () => {
    expect.assertions(9);
    expect(is.number({})).toEqual(false);
    expect(is.number([])).toEqual(false);
    expect(is.number(true)).toEqual(false);
    expect(is.number(undefined)).toEqual(false);
    expect(is.number(null)).toEqual(false);
    expect(is.number('valid')).toEqual(false);

    expect(is.number(NaN)).toEqual(false);
    expect(is.number(0)).toEqual(true);
    expect(is.number(Infinity)).toEqual(true);
  });

  it('checks that value is email', () => {
    expect.assertions(3);

    expect(is.email('some')).toEqual(false);
    expect(is.email('some@mail.')).toEqual(false);
    expect(is.email('some@mail.com')).toEqual(true);
  });

  it('checks that value is phone number', () => {
    expect.assertions(3);

    expect(is.phone('000000000000')).toEqual(false);
    expect(is.phone('+000000000000')).toEqual(false);
    expect(is.phone('+123456789000')).toEqual(true);
  });
});
