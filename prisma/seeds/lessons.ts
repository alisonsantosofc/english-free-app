import prisma from '../client';

import a1_lessons from './a1_lessons.json';
import a2_lessons from './a2_lessons.json';
import b1_lessons from './b1_lessons.json';
import b2_lessons from './b2_lessons.json';
import c1_lessons from './c1_lessons.json';
import c2_lessons from './c2_lessons.json';

export async function lessonsSeed() {
	const lessons = [
		...a1_lessons.map((lesson, index) => ({ ...lesson, id: index + 1 })), 
		...a2_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + index + 1 })),
		...b1_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + index + 1 })),
		...b2_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + b1_lessons.length + index + 1 })),
		...c1_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + b1_lessons.length + b2_lessons.length + index + 1 })),
		...c2_lessons.map((lesson, index) => ({ ...lesson, id: a1_lessons.length + a2_lessons.length + b1_lessons.length + b2_lessons.length + c1_lessons.length + index + 1 })),
	];

	for (const lesson of lessons) {
		await prisma.lesson.create({
			data: lesson,
		});
	}
}