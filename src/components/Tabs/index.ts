import { defineComponent, h } from "vue";
import TheTabs from "./TheTabs.vue";
import TheTabsItem from "./TheTabs.Item.vue";

const BaseTabs = defineComponent({
	name: "TheTabs",
	setup(props, { slots }) {
		return () => h(TheTabs, props, slots);
	},
});

BaseTabs.Item = TheTabsItem;

export const Tabs = BaseTabs as typeof BaseTabs & {
	Item: typeof TheTabsItem;
};
