<script setup lang="ts">
  const dropdownOpened = ref(false);

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <li class="nav-item dropdown" @click="dropdownOpened = !dropdownOpened">
    <a
      class="nav-link dropdown-toggle"
      :class="{ show: dropdownOpened }"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
    >
      {{ props.label }}
    </a>
    <div class="dropdown-menu" :class="{ show: dropdownOpened }">
      <slot>Dropdown Menu</slot>
    </div>
  </li>
</template>
