<template>
  <div>
    <NavBar />
    <div class="container body-container">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
if (typeof window !== "undefined") {
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function () {
    OneSignal.init({
      appId: "dafbb567-4184-4d55-8605-42bfd902bf5f",
    });
  });
}
</script>
