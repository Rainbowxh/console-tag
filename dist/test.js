import { testA } from "./testA";
import { testB } from "./testB";
import { testC } from "./testC";
const arrayMap = (array, callback) => {
    testA();
    testB();
    testC();
    let i = -1;
    const len = array.length;
    let resArray = [];
    while (++i < len) {
        resArray.push(callback(array[i], i, array));
    }
    return resArray;
};
export default arrayMap;
