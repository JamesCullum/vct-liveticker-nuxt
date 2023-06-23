<script setup>
  import { useErrors } from "@/composables/error";
  import { setLocalStorage } from "~/composables/localStorage";

  const currentError = useErrors();

  const isUserDisabled = ref(false);

  onMounted(() => {
    if (getLocalStorage(currentError.value.id, null) !== null) {
      isUserDisabled.value = true;
    }
  });

  function hideError() {
    isUserDisabled.value = true;

    setLocalStorage(currentError.value.id, "1");
  }
</script>
<template>
  <div
    class="alert alert-dismissible mb-4"
    :class="'alert-' + currentError.severity"
    v-if="currentError.message.length > 0 && !isUserDisabled"
  >
    <button
      type="button"
      class="btn-close"
      @click="hideError"
      title="Hide this message"
    ></button>
    <span v-html="currentError.message"></span>
    <button
      v-if="currentError?.buttonLabel"
      type="button"
      class="btn btn-light d-block"
      @click="currentError.buttonAction"
    >
      {{ currentError.buttonLabel }}
    </button>
  </div>
</template>
