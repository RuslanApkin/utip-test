import { makeAutoObservable } from "mobx";
import { TData } from "../Types";

const removeRow = (data: TData[], id: number): TData[] =>
    data.filter((data) => data.id !== id);

const sortData = (data: any[], key: string): TData[] =>
    data.sort((a, b) => {
        if (!isNaN(a[key])) return a[key] - b[key];

        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });

class Store {
    data: TData[] = [];
    count: number = 0;
    idCounter: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    removeRow(id: number) {
        this.data = removeRow(this.data, id);
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
                this.data = fetched.results.map((item: TData) => {
                    return { ...item, id: this.idCounter++ };
                });
                this.count = fetched.count;
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    clearData() {
        this.data = [];
        this.count = 0;
    }

    sortData(key: string) {
        this.data = sortData(this.data, key);
    }
}

const store = new Store();

export default store;
