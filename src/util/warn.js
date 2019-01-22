// @flow
/* eslint-disable */


/**
 * Throws a warning in console in development or staging environment only
 * @param warning
 * @param prefix
 */
export default function warn (
  warning: any,
  prefix: any,
) {
  if (process.env.NODE_ENV !== 'production') {
    try {
        prefix ? console.error(prefix, warning) : console.error(warning);
    } catch (e) {}
  }
}
