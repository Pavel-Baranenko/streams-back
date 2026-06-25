import { Context, Mutation, Resolver } from '@nestjs/graphql'
import type { GraphQLContext } from '@/src/shared/types/graphql-context.type'
import { UserModule } from '../account/models/user.module'
import { SessionService } from './session.service'

@Resolver('Session')
export class SessionResolver {
	public constructor(private readonly sessionService: SessionService) {}

	@Mutation(() => UserModule, { name: 'login' })
	public async login(@Context() { req }: GraphQLContext) {
		return this.sessionService.login(req, input)
	}
}
