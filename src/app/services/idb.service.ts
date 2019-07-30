import { Injectable } from "@angular/core";
import { Store, set, get, keys, del } from "idb-keyval";

@Injectable()
export class IDBService {
  private _store: Store;

  constructor() {
    this._store = new Store("curt", "store");
  }

  async setKey(key: IDBValidKey, data: any) {
    await set(key, data, this._store);
  }

  async deleteDataByKey(key: IDBValidKey) {
    await del(key, this._store);
  }

  async getDataByKey<T>(key: IDBValidKey) {
    return await get<T>(key, this._store);
  }

  async hasKey(key: IDBValidKey) {
    const allKeys = await keys(this._store);
    return allKeys.includes(key);
  }
}
