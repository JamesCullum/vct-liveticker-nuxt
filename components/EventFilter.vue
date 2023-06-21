<script setup lang="ts">
const selectedFilters = useFilters();

onMounted(() => {
  const savedFilters = getLocalStorage("filters", []);
  selectedFilters.value = savedFilters;
});

function onFilterClick(index: number) {
  const label = getFilterLabel(index);
  const newValue = isLabelFiltered(index)
    ? selectedFilters.value.filter((item: string) => item != label)
    : selectedFilters.value.concat(label);
  setLocalStorage("filters", newValue);
  selectedFilters.value = newValue;
}

function isLabelFiltered(index: number): boolean {
  return selectedFilters.value.includes(getFilterLabel(index));
}
</script>

<template>
  <div className="filter-list">
    <template v-for="(option, index) in filterOptions" :key="index">
      <button
        class="btn btn-sm me-1 mb-1"
        :class="[
          isLabelFiltered(index) ? 'btn-primary' : 'btn-secondary',
          'btn-secondary',
        ]"
        @click="onFilterClick(index)"
      >
        {{ getFilterLabel(index) }}
      </button>
    </template>
  </div>
</template>
