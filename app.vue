<template>
  <div>
    <NavBar />
    <div class="container body-container">
      <ErrorBanner />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
  body {
    padding-top: 100px;
  }

  svg {
    margin-top: -3px;
    margin-right: 5px;
    width: 16px;
    height: 16px;
  }
</style>
