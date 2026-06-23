import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const POSTGRES_URI = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?schema=public`
console.log('POSTGRES_URI:', POSTGRES_URI)
export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations'
	},
	datasource: {
		url: POSTGRES_URI
	}
})
