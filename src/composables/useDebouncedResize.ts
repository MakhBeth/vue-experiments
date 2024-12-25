import { ref, onMounted, onUnmounted } from "vue";

export const useDebouncedResize = (delay = 300) => {
	const width = ref<number>(window.innerWidth);
	let timeoutId: number | null = null;

	const updateSize = () => {
		if (timeoutId) {
			window.clearTimeout(timeoutId);
		}

		timeoutId = window.setTimeout(() => {
			width.value = window.innerWidth;
			timeoutId = null;
		}, delay);
	};

	onMounted(() => {
		window.addEventListener("resize", updateSize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", updateSize);
		if (timeoutId) {
			window.clearTimeout(timeoutId);
		}
	});

	return width;
};
