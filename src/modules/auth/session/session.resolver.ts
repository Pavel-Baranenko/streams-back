import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import type { GraphQLContext } from '@/src/shared/types/graphql-context.type'
import { UserModule } from '../account/models/user.module'
import { LoginInput } from './inputs/login.input'
import { SessionService } from './session.service'

@Resolver('Session')
export class SessionResolver {
	public constructor(private readonly sessionService: SessionService) {}

	@Mutation(() => UserModule, { name: 'loginUser' })
	public async login(
		@Context() { req }: GraphQLContext,
		@Args('data') input: LoginInput
	) {
		return this.sessionService.login(req, input)
	}

	@Mutation(() => Boolean, { name: 'logoutUser' })
	public async logout(@Context() { req }: GraphQLContext) {
		return this.sessionService.logout(req)
	}
}
