<script setup>
  import { Icomoon } from "vue-icomoon";
  import iconSet from "@/assets/Icon.json";

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number | String,
      required: false,
    },
  });

  if (!("size" in props)) props.size = "16px";
</script>

<template>
  <Icomoon :iconSet="iconSet" v-bind="props" />
</template>
