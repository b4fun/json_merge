// @flow

const _ = require('lodash');

function mergeObj(children /*: Array<any> */) /*: Object */ {
  return children.reduce((acc, child) => Object.assign(acc, child), {});
}

function isMergeObject(obj /*: any */) /*: boolean */ {
  if (!_.isPlainObject(obj)) {
    return false;
  }
  if (!_.isArray(obj.$merge)) { // here comes the magic
    return false;
  }

  return true;
}

function resolveMerge(obj /*: any */) /*: any */ {
  if (_.isPlainObject(obj)) {
    let objToTraversal = _.cloneDeep(obj);

    if (isMergeObject(objToTraversal)) {
      // merge children list
      objToTraversal = mergeObj(objToTraversal.$merge);
    }

    // try resolve every fields
    return _.reduce(objToTraversal, (acc, value, field) => {
      acc[field] = resolveMerge(value);
      return acc;
    }, {});
  }

  if (_.isArray(obj)) {
    // try resolve every children
    return obj.map(resolveMerge);
  }

  // not a compound structure, just return the value
  return obj;
}

module.exports = {
  resolveMerge,
  isMergeObject,
};
