<script lang="ts" setup>
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

const isSubscribed = ref(false);
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="isSubscribed ? 'btn-secondary' : 'btn-primary'"
    @click="isSubscribed = !isSubscribed"
  >
    <Icon :name="isSubscribed ? 'bell-slash' : 'bell'" />
    <span v-if="isSubscribed"> Unsubscribe from {{ props.type }} updates </span>
    <span v-else> Subscribe to {{ props.type }} updates </span>
  </button>
</template>
