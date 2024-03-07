export const _selectorIsId = selector =>
  typeof selector === 'number' ||
  typeof selector === 'string' ||
  selector instanceof MongoID.ObjectID
;
