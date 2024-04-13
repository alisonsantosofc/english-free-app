import { useLang } from '@/src/hooks/useLang';
import i18n from './i18n.json';

export function LandingAnimation() {
	const { lang } = useLang();

	return (
		<div className="w-screen overflow-hidden absolute bottom-[10%] left-0">
			<div className="relative w-full min-h-[108px] md:min-h-[174px] bg-shape-600 ">
				<div className="min-w-max flex gap-16 absolute bottom-4 left-0 animate-right-left">
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
					<h1 className="text-7xl md:text-9xl text-background font-extrabold tracking-wide">
						{i18n[lang].content.title}
					</h1>
				</div>
			</div>
		</div>
	);
}