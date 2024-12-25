import { ref, onMounted, watch, onUnmounted, type Ref } from "vue";

const initMedia = (
	query: string,
	media: Ref<MediaQueryList | null>,
	matches: Ref<boolean>,
) => {
	if (typeof window === "undefined") return;
	const mediaQuery = window.matchMedia(query);
	media.value = mediaQuery;
	matches.value = mediaQuery.matches;
};

export function useMedia(query: string): Ref<boolean> {
	const matches = ref(false);
	const media = ref<MediaQueryList | null>(null);

	const listener = () => {
		matches.value = media.value?.matches ?? false;
	};

	onMounted(() => initMedia(query, media, matches));

	watch([media, () => query], () => {
		if (!media.value) return;
		if (!media.value.addEventListener) return;

		media.value.addEventListener("change", listener);
	});

	onUnmounted(() => {
		media.value?.removeEventListener("change", listener);
	});

	return matches;
}
