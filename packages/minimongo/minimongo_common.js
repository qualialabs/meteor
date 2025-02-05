import LocalCollection_ from './local_collection.js';
import Matcher from './matcher.js';
import Sorter from './sorter.js';

export const LocalCollection = LocalCollection_;
export const Minimongo = {
    LocalCollection: LocalCollection_,
    Matcher,
    Sorter
};
