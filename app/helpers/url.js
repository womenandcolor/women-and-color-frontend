import { pipe, replace, join, filter, map, trim, always, ifElse } from 'ramda';

import { hasValue, isNil } from './validation';

// Anything that is not a-z A-Z
const omittedNameCharacters = /[^a-zA-Z]/g;

const whitespaceCharacters = /[\s]/g;

const returnEmptyString = always('');

// Remove omitted charaters, replace spaces with dashes,
// return empty string if empty / null / undefined
const sanitizeName = ifElse(
  hasValue,
  pipe(
    trim,
    replace(omittedNameCharacters, ''),
    replace(whitespaceCharacters, '-')
  ),
  returnEmptyString
);

export const speakerToNamePath = ({ first_name, last_name }) =>
  pipe(map(sanitizeName), filter(hasValue), join('-'))([first_name, last_name]);

export const speakerToProfilePath = ({
  basePath = '',
  id,
  first_name,
  last_name,
}) => {
  const namePath = speakerToNamePath({ first_name, last_name });
  return `${basePath}/speaker/${id}/${namePath}`;
};


export const ensureAbsoluteUrl = (url) => {
  return url.startsWith('http') ? url : `http://${url}`;
}