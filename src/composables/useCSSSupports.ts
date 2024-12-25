import { computed, ref } from "vue";

export function useCSSSupports(query: string) {
	const matches = ref(false);

	if (CSS.supports(query)) {
		matches.value = true;
	}

	return computed(() => matches.value);
}
