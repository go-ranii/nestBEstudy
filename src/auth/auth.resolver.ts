import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => String)
  loginUser(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.loginUser(email, password);
  }
}
