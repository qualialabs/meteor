import { EJSON } from 'meteor/ejson';
import decimal from 'decimal.js';
const { Decimal } = decimal;

Decimal.prototype.typeName = function() {
  return 'Decimal';
};

Decimal.prototype.toJSONValue = function () {
  return this.toJSON();
};

Decimal.prototype.clone = function () {
  return Decimal(this.toString());
};

EJSON.addType('Decimal', function (str) {
  return Decimal(str);
});

export { Decimal };
