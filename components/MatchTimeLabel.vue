<script lang="ts" setup>
  const props = defineProps<{
    status: Number;
    dateTime: DateInterface;
    stream?: String;
  }>();

  const hasStream = "stream" in props && typeof props.stream !== "undefined";
  const timeDiff = getTimeDiff(props.dateTime);
</script>

<template>
  <NuxtLink
    v-if="hasStream && status == 1"
    :to="(stream as string)"
    target="_blank"
  >
    <Icon name="video-camera" />
  </NuxtLink>
  <Icon v-else-if="status == 1" name="circle" />
  <span v-else-if="status == 2"> {{ timeDiff }} AGO </span>
  <span v-else-if="Date.now() < dateTime.seconds * 1000">
    IN {{ timeDiff }}
  </span>
  <span v-else> STARTING... </span>
</template>
