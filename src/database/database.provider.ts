import { DataSource } from 'typeorm';

export const KolkataDataSource = (config: {
  host: string;
  db_user: string;
  db_password: string;
  db_name: string;
  db_port: number;
}) => {
  return new DataSource({
    type: 'mysql',
    host: config.host,
    port: config.db_port,
    username: config.db_user,
    password: config.db_password,
    database: config.db_name,
    entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  });
};