import prisma from "../client";
import a1_lessons from './a1_lessons.json';

export async function lessonsSeed() {
  await prisma.lesson.createMany({
    data: a1_lessons,
  });
}
