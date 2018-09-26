import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataMemoryService {

  constructor() { }

  /**
   * Save a single pair value to the memory storage.
   * @param _key key value name.
   * @param _value current key value.
   */
  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Get a single data value from memory.
   * @param _key key value.
   */
  public getValue(key: string): Promise<any> {
    const promise = new Promise<any>((resolve) => {
      resolve(localStorage.getItem(key));
    });
    return promise;
  }

  /**
   * Get the data values from memory based of the array of keys received.
   * The order of each key it's important to set a sequential assignment.
   * @param _keys Array of key values.
   */
  public getDataValues(keys: string[]): Promise<any> {
    const promise = new Promise<any>((resolve) => {
      const values = [];
      for (let index = 0; index < keys.length; index++) {
        values.push(localStorage.getItem(keys[index]));
      }
      resolve(values);
    });
    return promise;
  }

  /**
   * Remove a single data value from memory.
   * @param key key value.
   */
  public removeValue(key: string): void {
    localStorage.removeItem(key);
  }
}
