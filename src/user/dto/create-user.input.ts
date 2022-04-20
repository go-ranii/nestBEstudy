import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'userEmail' })
  email: string;
  @Field(() => String, { description: 'userPassword' })
  password: string;
  @Field(() => String, { description: 'userName' })
  name: string;
}
