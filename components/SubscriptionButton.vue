<script lang="ts" setup>
  import {
    useNotificationTags,
    addNotificationTag,
    removeNotificationTag,
  } from "@/composables/notifications";

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  });

  const notificationTags = useNotificationTags();
  const isSubscribed = computed(
    () =>
      notificationTags !== null && getThisTagName() in notificationTags.value
  );

  function getThisTagName() {
    return props.type + "-" + props.label;
  }

  function clickSubscribe() {
    const label = getThisTagName();
    isSubscribed.value
      ? removeNotificationTag(label)
      : addNotificationTag(label);
  }
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="isSubscribed ? 'btn-secondary' : 'btn-primary'"
    @click="clickSubscribe"
  >
    <Icon :name="isSubscribed ? 'bell-slash' : 'bell'" />
    <span v-if="isSubscribed"> Unsubscribe from {{ props.type }} updates </span>
    <span v-else> Subscribe to {{ props.type }} updates </span>
  </button>
</template>
