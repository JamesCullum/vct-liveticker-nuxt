<script lang="ts" setup>
  import { type Unsubscribe } from "firebase/firestore";

  const eventList = useEvents();

  const filters = useFilters();
  const isLoading = useState("isEventListLoading", () => true);
  const firestoreStopStream = ref<Unsubscribe>(() => {});

  const orderedEvents = computed(() => {
    return getOrderedEventNames(eventList.value);
  });

  onMounted(() => {
    if (isLoading.value) {
      firestoreStopStream.value();

      firestoreStopStream.value = onEventListUpdate(
        (data: EventListInterface | boolean) => {
          isLoading.value = false;
          console.log("eventListUpdate", data);

          if (typeof data == "boolean") {
            // TODO
          } else {
            eventList.value = data;
          }
        }
      );
    }
  });
</script>

<template>
  <div id="event-list">
    <div v-if="orderedEvents.length == 0" class="text-center w-100 mt-3">
      <p v-if="isLoading">Content is loading...</p>
      <p v-else>Currently no events ongoing</p>
    </div>
    <div v-else>
      <template v-for="eventName in orderedEvents" :key="eventName">
        <EventItem
          v-if="filters.length == 0 || filterContains(eventName, filters) != null"
          :eventName="eventName"
        />
      </template>
    </div>
  </div>
</template>
