import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ res, req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      database: 'postgres03',
      username: 'postgres',
      password: '1234',
      host: '34.64.156.127',
      entities: [__dirname + '/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
