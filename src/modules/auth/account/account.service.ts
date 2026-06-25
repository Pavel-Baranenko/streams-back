import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { CreateUserInput } from './inputs/create-iser.input'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAll() {
		const users = await this.prismaService.user.findMany()
		return users
	}

	public async create(input: CreateUserInput) {
		const { email, password, username } = input
		const existingUser = await this.prismaService.user.findUnique({
			where: { username }
		})

		if (existingUser) throw new ConflictException('Username already exists')

		const existingEmail = await this.prismaService.user.findUnique({
			where: { email }
		})

		if (existingEmail) throw new ConflictException('Email already exists')

		const user = await this.prismaService.user.create({
			data: {
				email,
				username,
				password: await hash(password),
				displayName: username
			}
		})

		return user
	}
}
