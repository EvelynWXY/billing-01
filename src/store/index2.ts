import recordStore from "./recordStore";
import tagStore from "./tagStore";

const store = {
    ...recordStore, //浅拷贝，把地址拷贝过来
    ...tagStore,

};
console.log(store);

export default store;