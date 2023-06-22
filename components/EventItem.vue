<script lang="ts" setup>
  const eventList = useEvents();
  const showItemLimit = ref(6);

  const props = defineProps<{
    eventName: string;
  }>();

  const matchList = computed(() => {
    return getOrderedMatchItems(
      eventList.value[props.eventName] as EventItemInterface
    );
  });
</script>

<template>
  <div class="row mb-4">
    <div class="event-container">
      <div class="event-title-bar">
        <div class="row">
          <h2 class="col-lg-8">
            <span class="event-name">
              {{ props.eventName }}
            </span>
          </h2>
          <div class="col-lg-4 text-end d-none d-lg-block">
            <SubscriptionButton
              class="btn-lg"
              type="event"
              :label="props.eventName"
            />
          </div>
        </div>
      </div>
      <div class="row match-list-container">
        <template
          v-for="(matchData, matchIndex) in matchList"
          :key="matchData.id"
        >
          <MatchItem v-if="matchIndex < showItemLimit" :match="matchData" />
        </template>
        <div v-if="showItemLimit < matchList.length" class="pagination-bar">
          <div class="d-grid gap-2">
            <button
              class="btn btn-primary pagination-forward"
              type="button"
              aria-label="Load more"
              @click="showItemLimit += 3"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
