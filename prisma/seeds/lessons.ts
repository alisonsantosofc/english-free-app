import prisma from '../client';

import a1_lessons from './a1_lessons.json';
import a2_lessons from './a2_lessons.json';
import b1_lessons from './b1_lessons.json';
import b2_lessons from './b2_lessons.json';
import c1_lessons from './c1_lessons.json';
import c2_lessons from './c2_lessons.json';

export async function lessonsSeed() {
	const lessons = [
		...a1_lessons, 
		...a2_lessons,
		...b1_lessons,
		...b2_lessons,
		...c1_lessons,
		...c2_lessons,
	];

	lessons.forEach(async (lesson) => {
		await prisma.lesson.create({
			data: lesson,
		});
	});
}
