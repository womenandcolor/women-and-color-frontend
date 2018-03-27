import { isNil, not, pipe, isEmpty, allPass } from 'ramda';

export const isNotNil = pipe(isNil, not);
export const isNotEmpty = pipe(isEmpty, not);
export const hasValue = allPass([isNotNil, isNotEmpty]);
