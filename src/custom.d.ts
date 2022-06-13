
//xxx.d.ts 表示是自定义的类
//全局使用的类型
type RecordItem = {
    tags: string[], //字符串数组
    notes: string,
    type: string,
    amount: number, //数据类型 object ｜ string （类型是对所有数据的分类）
    createAt?: Date, // 类 / 构造函数 （类是对 object 的分类）
}
type Tag = {
    id: string,
    name: string,
}
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplicated', // 联合类型
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated',
    remove: (id: string) => boolean,
    save: () => void
}

interface Window {

}
