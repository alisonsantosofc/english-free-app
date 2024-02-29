import prisma from "../client";

import a1_lessons from './a1_lessons.json';
import a2_lessons from './a2_lessons.json';

export async function lessonsSeed() {
  await prisma.lesson.createMany({
    data: [...a1_lessons, ...a2_lessons],
  });
}
