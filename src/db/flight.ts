import { DatabaseRepo } from './baseRepo';
import { Database, db } from './db';
export class FlightRepos implements DatabaseRepo {
    private _db: Database;
  
    constructor(private instance: Database) {
      this._db = instance;
    }
  
    async query<T>(sql: string, values?: any[]): Promise<T[]> {
      try {
        const [rows] = await this._db.query(sql, values);
        return rows as T[];
      } catch (error) {
        throw new Error(`Error executing query: ${error}`);
      }
    }
  
    async insert<T>(table: string, data: T): Promise<number> {
      try {
        const [result] = await this._db.query(
          `INSERT INTO ${table} SET ?`,
          data
        );
        return result.insertId;
      } catch (error) {
        throw new Error(`Error inserting data: ${error}`);
      }
    }
  
    async delete(table: string, whereClause: string): Promise<number> {
      try {
        const [result] = await this._db.query(
          `DELETE FROM ${table} WHERE ${whereClause}`
        );
        return result.affectedRows;
      } catch (error) {
        throw new Error(`Error deleting data: ${error}`);
      }
    }
  
    async update<T>(table: string, data: T, whereClause: string): Promise<number> {
      try {
        const [result] = await this._db.query(
          `UPDATE ${table} SET ? WHERE ${whereClause}`,
          data
        );
        return result.affectedRows;
      } catch (error) {
        throw new Error(`Error updating data: ${error}`);
      }
    }
  
    async close(): Promise<void> {
      await this._db.close();
    }
  }

  export const instance = new FlightRepos(db);