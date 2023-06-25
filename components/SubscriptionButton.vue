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

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
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
    <span v-if="isSubscribed">
      <span class="d-none d-md-inline">
        Unsubscribe from {{ props.type }} updates
      </span>
      <span class="d-md-none">
        {{ capitalizeFirstLetter(props.type) }} Updates
      </span>
    </span>
    <span v-else>
      <span class="d-none d-md-inline">
        Subscribe to {{ props.type }} updates
      </span>
      <span class="d-md-none">
        {{ capitalizeFirstLetter(props.type) }} Updates
      </span>
    </span>
  </button>
</template>

<style scoped>
  svg {
    margin-top: -3px;
    margin-right: 5px;
  }
</style>
