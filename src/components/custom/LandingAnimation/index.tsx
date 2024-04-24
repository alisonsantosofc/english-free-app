import { useLang } from '@/src/hooks/useLang';
import i18n from './i18n.json';

export function LandingAnimation() {
	const { lang } = useLang();

	return (
		<div className="w-screen overflow-hidden absolute bottom-[10%] left-0">
			<div className="relative w-full h-[28px] md:h-[48px] bg-blue-800">
				<div className="min-w-max flex gap-12 absolute bottom-1.5 md:bottom-2.5 left-0 animate-right-left">
					{/** +++ Block +++ */}
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.learnFree}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.dominate}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.sixSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twelveSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twentyFourSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.learnFree}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.dominate}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.sixSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twelveSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twentyFourSchedule}
					</h1>
					{/** --- Block --- */}

					{/** +++ Block +++ */}
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.learnFree}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.dominate}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.sixSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twelveSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twentyFourSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.learnFree}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.dominate}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.sixSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twelveSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twentyFourSchedule}
					</h1>
					{/** --- Block --- */}

					{/** +++ Block +++ */}
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.learnFree}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.dominate}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.sixSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twelveSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twentyFourSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.learnFree}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.dominate}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.sixSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twelveSchedule}
					</h1>
					<h1 className="text-xs md:text-lg text-background font-bold tracking-wide">
						{i18n[lang].content.twentyFourSchedule}
					</h1>
					{/** --- Block --- */}
				</div>
			</div>
		</div>
	);
}
