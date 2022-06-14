import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex); //把 store 绑到 Vue.prototype 上 .$store = store

const store = new Vuex.Store({
  state: { //data
    recordList: [] as RecordItem[]
  },
  mutations: { //methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];

    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList.push(record2);
      console.log(state.recordList);
    },
    saveRecords(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    }
  }
})


export default store;