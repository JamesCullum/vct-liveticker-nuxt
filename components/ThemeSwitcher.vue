<script lang="ts" setup>
const selectedTheme = useTheme();
const savedTheme = getLocalStorage("theme", 0);

if (selectedTheme.value != savedTheme) {
  selectedTheme.value = savedTheme;
}

function nextTheme() {
  selectedTheme.value =
    selectedTheme.value >= Object.keys(THEMES).length - 1
      ? 0
      : selectedTheme.value + 1;

  setLocalStorage("theme", selectedTheme.value);
}
</script>

<template>
  <a href="#" class="nav-link" @click="nextTheme">
    <Icon :name="themeIcons[selectedTheme]" />
    {{ themeLabels[selectedTheme] }}
  </a>
</template>

<style>
:root {
  --bs-primary-rgb: 71, 179, 255;
  --bs-body-bg: #dadadc;
  --bs-navbar-color: #fff;
  --bs-secondary: #00477a;
}

.bg-primary .navbar-nav .nav-link.active,
.bg-primary .navbar-nav .nav-link:focus,
.bg-primary .navbar-nav .nav-link:hover,
.bg-primary .navbar-nav .show > .nav-link {
  color: var(--bs-secondary) !important;
}

.btn-primary {
  background-color: rgb(var(--bs-primary-rgb));
  border-color: rgb(var(--bs-primary-rgb));
}

.btn-primary:hover {
  background-color: var(--bs-secondary);
  border-color: var(--bs-secondary);
}

.dropdown-item:focus,
.dropdown-item:hover {
  background-color: var(--bs-secondary);
}

/* Dark mode */
body.dark {
  --bs-primary-rgb: 18, 18, 18;
  --bs-body-bg: #303030;
  --bs-secondary: #47b3ff;
  color: white;
}

body.dark .card,
body.dark select,
body.dark input,
body.dark .dropdown-menu {
  background-color: #424242 !important;
  color: white;
}

body.dark .btn,
body.dark form,
body.dark .dropdown-item {
  color: white;
}
</style>
