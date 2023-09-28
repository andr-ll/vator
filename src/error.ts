import { ValidationErrorPayload } from './types';

export class ValidationError extends Error {
  constructor(errorPayload: ValidationErrorPayload) {
    const prefix = 'Validation failed: ';
    const { customMessage } = errorPayload;

    if (customMessage) {
      super(`${prefix}${customMessage}`);
      return;
    }

    const { key, received, expected, parentKeys, convertFailed } = errorPayload;

    const item = key
      ? key === 'single value'
        ? 'value'
        : key === 'array item'
        ? key
        : `key '${key}'`
      : 'value';

    const receivedMessage = received === 'missing' ? 'is missing' : `has type '${received}'`;

    const keyTrace = `${parentKeys?.length ? ` (at '${parentKeys.join(' -> ')}')` : ''}.`;

    const validationMessageEnd = 'type is required' + keyTrace;
    const convertMessageEnd = 'is used' + keyTrace;

    const message = convertFailed
      ? `could not convert ${item} to '${expected}'. Invalid value of type '${received}' ${convertMessageEnd}`
      : `${item} ${receivedMessage}, but '${expected}' ${validationMessageEnd}`;

    super(`${prefix}${message}`);
  }
}
