export interface ILesson {
  id: number;
  name: string;
  src: string;
  level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
  category: 'grammar' | 'vocabulary' | 'topics';
  priority: number;
}