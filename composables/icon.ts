import { h } from "vue";
import Icon from "@/components/Icon.vue";
import { renderToString } from "@vue/server-renderer";

export function renderIconString(name: string): Promise<string> {
  const iconShare = h(Icon, { name });
  return renderToString(iconShare);
}
