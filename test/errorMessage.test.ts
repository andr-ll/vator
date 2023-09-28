import { v, validate } from '../src';

describe('error message check', () => {
  it('throws error with expected message', () => {
    expect.assertions(1);
    const ERROR_MESSAGE = 'something went wrong';

    const customError = () => validate(undefined, v.string, ERROR_MESSAGE);
    expect(customError).toThrow(ERROR_MESSAGE);
  });
});
