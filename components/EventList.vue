<script lang="ts" setup>
import { Unsubscribe } from "firebase/firestore";

const eventList = useEvents();
const eventArray = getOrderedEventNames(eventList.value);

const filters = useFilters();
const isLoading = ref(true);
const firestoreStopStream = ref<Unsubscribe>(() => {});

if (typeof window !== "undefined") {
  firestoreStopStream.value();

  firestoreStopStream.value = onEventListUpdate(
    (data: eventListInterface | boolean) => {
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
</script>

<template>
  <div id="event-list">
    <div v-if="eventArray.length == 0" class="text-center w-100 mt-3">
      <p v-if="isLoading">Content is loading...</p>
      <p v-else>Currently no events ongoing</p>
    </div>
    <div v-else>
      <template v-for="eventName in eventArray" :key="eventName">
        <EventItem
          v-if="filters.length == 0 || filterContains(eventName, filters)"
          :eventName="eventName"
        />
      </template>
    </div>
  </div>
</template>
