//xxx.d.ts 表示是自定义的类
//全局使用的类型
type RecordItem = {
    tags: string[], //字符串数组
    notes: string,
    type: string,
    amount: number, //数据类型 object ｜ string （类型是对所有数据的分类）
    createAt?: Date, // 类 / 构造函数 （类是对 object 的分类）
}