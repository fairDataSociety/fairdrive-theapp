export const ERROR_MESSAGE_DATA_NOT_FOUND = 'Data not found';
export const ERROR_MESSAGE_JSON_PARSING = 'Error in JSON parsing for';

/**
 * Checks that error is a fdp-storage data not found error
 */
export function isDataNotFoundError(error: unknown): boolean {
  return (error as Error)?.message === ERROR_MESSAGE_DATA_NOT_FOUND;
}

/**
 * Checks that error is a fdp-storage JSON parsing error
 */
export function isJsonParsingError(error: unknown): boolean {
  return (error as Error)?.message.startsWith(ERROR_MESSAGE_JSON_PARSING);
}
