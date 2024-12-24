import type { Ref } from "vue";

export interface TheTabsContext {
	activeTab: Ref<string>;
	setActiveTab: (tabId: string) => void;
}
