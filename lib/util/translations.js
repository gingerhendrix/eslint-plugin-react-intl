/* eslint-disable no-sync */
const fs = require('fs');
const path = require('path');

/**
 * Map of locale file paths to keys and modified time
 *
 * @type {{string: {keys: Array, mtime: number}}}
 */
const localeFilesKeys = {};

/**
 * Get a list of ids keys from reading locale files
 * Keeps track of modified times and reloads if changed,; useful for realtime eslint in-editor
 *
 * @param {object} context - Context
 * @returns {string[]} results - Array of ids
 */
function getIntlIds(context) {
  const { localeFiles, projectRoot } = context.settings;

  if (!localeFiles) {
    throw new Error('localeFiles not in settings');
  }

  const results = [];
  localeFiles.forEach(f => {
    const fullPath = projectRoot ? path.join(projectRoot, f) : f;
    const mtime = fs.lstatSync(fullPath).mtime.getTime();
    if (!localeFilesKeys[fullPath] || mtime !== localeFilesKeys[fullPath].mtime
    ) {
      const json = JSON.parse(fs.readFileSync(fullPath));
      localeFilesKeys[fullPath] = {
        keys: getKeys(json),
        mtime: mtime
      };
    }
    results.push(...localeFilesKeys[fullPath].keys);
  });

  return results;
}

function getKeys(json, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(json)) {
    if (typeof value === 'string') {
      keys.push(prefix + key);
    } else {
      keys = keys.concat(getKeys(value, prefix + key + '.'));
    }
  }
  return keys;
}



module.exports = {
  getIntlIds
};
