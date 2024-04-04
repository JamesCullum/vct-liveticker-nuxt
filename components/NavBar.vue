<script lang="ts" setup>
  const extendedMobileMenu = ref(false);
</script>

<template>
  <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        <nuxt-img src="/img/logo-white_30.png" width="30" height="30" alt="Logo" />
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        @click="extendedMobileMenu = !extendedMobileMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="extendedMobileMenu ? 'show' : ''"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">Events</NuxtLink>
          </li>
          <Dropdown label="About">
            <NuxtLink
              class="dropdown-item"
              target="_blank"
              to="https://www.reddit.com/r/ValorantCompetitive/"
              >Community</NuxtLink
            >
            <NuxtLink
              class="dropdown-item"
              target="_blank"
              to="https://github.com/JamesCullum/vct-liveticker-nuxt3"
              >Development</NuxtLink
            >
            <NuxtLink
              class="dropdown-item"
              target="_blank"
              to="https://github.com/sponsors/JamesCullum"
              >Donation</NuxtLink
            >
          </Dropdown>
        </ul>
        <ul class="navbar-nav ms-md-auto">
          <li class="nav-item" id="menu-profile">
            <NavBarNotification />
          </li>
          <li class="nav-item" id="menu-lightswitch">
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
