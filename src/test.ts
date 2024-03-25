import { testA } from "./testA";
import { testB } from "./testB";
import { testC } from "./testC";


const arrayMap = (array: [], callback:(item: any,index: number, arr: any[]) => any): any => {
    testA();
    testB();
    testC();
   
    let i = -1
    const len = array.length
    let resArray = []
    while (++i < len){
        resArray.push(callback(array[i],i,array))
    }
    return resArray
}
export default arrayMap