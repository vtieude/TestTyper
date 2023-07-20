import mysql from 'mysql';

export class Database {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user:  process.env.DB_USER,
      password:  process.env.DB_PASSWORD,
      database:  process.env.DB_NAME
    });

  
  }
  public async connectDb(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL database:', err);
          reject(err);
        } else {
          console.log('Connected to MySQL database!');
          resolve('Success');
        }
      });
    }) 
  }
  public async query(sql: string, args?: any): Promise<any> {
    return  new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }) 
  }

  public close() {
    this.connection.end();
  }
}
export const db = new Database();