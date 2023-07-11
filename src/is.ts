export class is {
  private static emailRegExp = new RegExp(/^[\w-.]{0,35}@([\w-]+\.){0,35}[\w-]{2,4}$/);
  private static phoneRegExp = new RegExp(/^\+?[1-9][0-9]{7,14}$/);

  /**
   * Checks that values is `undefined`.
   * @param value - any value.
   * @returns boolean
   */
  static undefined(value: unknown): value is undefined {
    return value === undefined;
  }

  /**
   * Checks that values is `undefined`.
   * @param value - any value.
   * @returns boolean
   */
  static null(value: unknown): value is null {
    return value === null;
  }

  /**
   * Checks that values is `null` or `undefined`.
   * @param value - any value.
   * @returns boolean
   */
  static nullable(value: unknown): value is null | undefined {
    return value == null;
  }

  /**
   * Checks that values is `string`. Will return `false` for an empty string.
   * @param value - any value.
   * @returns boolean
   */
  static string(value: unknown): value is string {
    return typeof value === 'string' && value.trim() !== '';
  }

  /**
   * Checks that values is `number`. Will return `false` for `NaN` value.
   * @param value - any value.
   * @returns boolean
   */
  static number(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  /**
   * Checks that values is valid email address.
   * @param value - any value.
   * @returns boolean
   */
  static email(value: unknown): value is string {
    return this.string(value) && this.emailRegExp.test(value);
  }

  /**
   * Checks that values is valid phone number.
   * @param value - any value.
   * @returns boolean
   */
  static phone(value: unknown): value is string {
    return this.string(value) && this.phoneRegExp.test(value);
  }
}
