import mysql from 'mysql';

export class Database {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user:  process.env.DB_USER,
      password:  process.env.DB_PASSWORD,
      database:  process.env.DB_NAME
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }

      console.log('Connected to MySQL database!');
    });
  }

  public async query(sql: string, args?: any): Promise<any> {
    return  await this.connection.query(sql, args);
  }

  public close() {
    this.connection.end();
  }
}
export const db = new Database();