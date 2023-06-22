<script lang="ts" setup>
  import {
    useOneSignal,
    initNotifications,
    isNotificationUser,
    enableNotifications,
  } from "@/composables/notifications";

  const isLoading = useState("isNotificationLoading", () => true);

  onMounted(() => {
    if (isLoading.value) {
      useOneSignal().push(() => {
        initNotifications();
        isLoading.value = false;
      });
    }
  });
</script>

<template>
  <a
    v-if="!isNotificationUser"
    href="#"
    class="nav-link sign-in"
    @click="enableNotifications"
  >
    <Icon name="user" />
    Sign In
  </a>
  <NuxtLink v-if="isNotificationUser" class="nav-link" to="/subscriptions">
    Manage Notifications
  </NuxtLink>
</template>
