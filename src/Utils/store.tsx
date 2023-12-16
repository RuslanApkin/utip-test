import { makeAutoObservable } from "mobx";
import { TData } from "../Types";

export const tableConfig = {
  rows: [
    { title: "Name", key: "name", type: "text" },
    { title: "Height", key: "height", type: "number" },
    { title: "Mass", key: "mass", type: "number" },
    { title: "Gender", key: "gender", type: "text" },
    { title: "Hair color", key: "hair_color", type: "text" }
  ]
};

const removeRow = (data: TData[], id: number): TData[] =>
  data.filter((data) => data.id !== id);

const sortData = (data: any[], key: string): TData[] =>
  data.sort((a, b) => {
    if (!isNaN(a[key])) return a[key] - b[key];

    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });

const saveData = (
  data: TData[],
  count: number,
  idCounter: number,
  page: number,
  sortedBy: string
) => {
  window.localStorage.setItem("data", JSON.stringify(data));
  window.localStorage.setItem("count", count + "");
  window.localStorage.setItem("idCounter", idCounter + "");
  window.localStorage.setItem("page", page + "");
  window.localStorage.setItem("sortedBy", sortedBy + "");
};

const getData = (): {
  data: TData[];
  count: number;
  idCounter: number;
  page: number;
  sortedBy: string;
} => {
  const localDataStr: any = window.localStorage.getItem("data");
  if (localDataStr) {
    const localData: TData[] = JSON.parse(localDataStr);
    const localCount: number = Number(window.localStorage.getItem("count"));
    const localCounter: number = Number(
      window.localStorage.getItem("idCounter")
    );
    const localPage: number = Number(window.localStorage.getItem("page"));
    const localSortedBy: string = window.localStorage.getItem("sortedBy") + "";
    return {
      data: localData,
      count: localCount,
      idCounter: localCounter,
      page: localPage,
      sortedBy: localSortedBy
    };
  }
  return { data: [], count: 0, idCounter: 0, page: 0, sortedBy: "" };
};

class Store {
  data: TData[] = [];
  count: number = 0;
  idCounter: number = 0;
  page: number = 0;
  sortedBy: string = "";

  constructor() {
    makeAutoObservable(this);
    const localStorage = getData();
    if (localStorage.data.length) {
      this.data = localStorage.data;
      this.count = localStorage.count;
      this.idCounter = localStorage.idCounter;
      this.page = localStorage.page;
      this.sortedBy = localStorage.sortedBy;
    }
  }

  removeRow(id: number) {
    this.data = removeRow(this.data, id);
    this.count -= 1;
  }

  async fetchData(url: string) {
    await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((fetched) => {
        this.data = [
          ...this.data,
          ...fetched.results.map((item: TData) => {
            return { ...item, id: this.idCounter++ };
          })
        ];
        this.count += fetched.results.length;
        this.sortedBy = "";
      })
      .catch((err) => {
        console.log(err.message);
      });
    saveData(this.data, this.count, this.idCounter, this.page, this.sortedBy);
  }

  clearData() {
    this.data = [];
    this.count = 0;
    saveData(this.data, this.count, this.idCounter, this.page, this.sortedBy);
  }

  sortData(key: string) {
    this.data = sortData(this.data, key);
    this.sortedBy = key;
    saveData(this.data, this.count, this.idCounter, this.page, this.sortedBy);
  }

  addRow(data: TData) {
    this.count = this.data.push({ ...data, id: this.idCounter++ });
    saveData(this.data, this.count, this.idCounter, this.page, this.sortedBy);
  }
}

const store = new Store();

export default store;
