import {
  AccountsClient,
  AccountsTest,
} from "./accounts_client.js";

/**
 * @namespace Accounts
 * @summary The namespace for all client-side accounts-related methods.
 */
const Accounts = new AccountsClient();

/**
 * @summary A [Mongo.Collection](#collections) containing user documents.
 * @locus Anywhere
 * @type {Mongo.Collection}
 * @importFromPackage meteor
 */
Meteor.users = Accounts.users;

export {
  Accounts,
  AccountsClient,
  AccountsTest
};
