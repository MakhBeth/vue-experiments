import type { Ref, VNode } from "vue";

export interface TheTabsContext {
	activeTab: Ref<string>;
	setActiveTab: (tabId: string) => void;
}

export type TabLabel = string | VNode;

export type TabLabels = {
	label: TabLabel;
	tabId: string;
}[];
