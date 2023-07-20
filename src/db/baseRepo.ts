export interface DatabaseRepo {
    query<T>(sql: string, values?: any[]): Promise<T[]>;
    insert<T>(table: string, data: T): Promise<number>;
    delete(table: string, whereClause: string): Promise<number>;
    update<T>(table: string, data: T, whereClause: string): Promise<number>;
}