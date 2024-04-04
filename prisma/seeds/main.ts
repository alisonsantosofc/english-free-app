import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

import a1_lessons from './lessons/a1_lessons.json';
import a2_lessons from './lessons/a2_lessons.json';
import b1_lessons from './lessons/b1_lessons.json';
import b2_lessons from './lessons/b2_lessons.json';
import c1_lessons from './lessons/c1_lessons.json';
import c2_lessons from './lessons/c2_lessons.json';

const prisma = new PrismaClient();

async function main() {
	const password = await hash('password123', 12);
	const user = await prisma.users.upsert({
		where: { email: 'admin@admin.com' },
		update: {},
		create: {
			email: 'admin@admin.com',
			name: 'Admin',
			password,
			isAdmin: true,
		},
	});

	const lessons = [
		...a1_lessons.map((lesson, index) => ({ ...lesson, id: index + 1 })), 
		...a2_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + index + 1 })),
		...b1_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + index + 1 })),
		...b2_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + b1_lessons.length + index + 1 })),
		...c1_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + b1_lessons.length + b2_lessons.length + index + 1 })),
		...c2_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + b1_lessons.length + b2_lessons.length + c1_lessons.length + index + 1 })),
	];

	for (const lesson of lessons) {
		await prisma.lessons.create({
			data: lesson,
		});
	}

	console.log({ user });
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});