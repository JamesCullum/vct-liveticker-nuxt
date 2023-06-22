<script lang="ts" setup>
  import {
    getGroupedNotificationTags,
    removeAllNotificationTags,
    unsubscribeEvents,
    unsubscribeAllMatches,
  } from "@/composables/notifications";

  let eventsToDelete = ref(<Array<string>>[]);

  function deleteEvents() {
    let deleteSelection =
      eventsToDelete.value.length == 0
        ? getGroupedNotificationTags.value.events
        : eventsToDelete.value;
    unsubscribeEvents(deleteSelection);
    eventsToDelete.value = [];
  }
</script>
<template>
  <form class="bg-light p-5">
    <fieldset>
      <h4>Manage Subscriptions</h4>
      <div class="form-group mt-3">
        <label class="form-label"> Events </label>
        <div class="input-group mb-3">
          <select
            class="form-select"
            multiple
            :disabled="getGroupedNotificationTags.events.length == 0"
            v-model="eventsToDelete"
          >
            <option v-if="getGroupedNotificationTags.events.length == 0">
              You are not subscribed to any events
            </option>

            <option
              v-for="eventTag in getGroupedNotificationTags.events"
              :key="eventTag"
            >
              {{ eventTag }}
            </option>
          </select>
          <button
            class="btn btn-danger"
            type="button"
            :disabled="getGroupedNotificationTags.events.length == 0"
            @click="deleteEvents"
          >
            <span v-if="eventsToDelete.length == 0">Remove All</span>
            <span v-else>Remove Selected</span>
          </button>
        </div>
      </div>
      <div class="form-group mt-3">
        <label class="form-label">Matches</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            :value="
              getGroupedNotificationTags.matches.length > 0
                ? 'You are subscribed to ' +
                  getGroupedNotificationTags.matches.length +
                  ' matches'
                : 'You are not subscribed to any match updates'
            "
            disabled
          />
          <button
            class="btn btn-danger"
            type="button"
            :disabled="getGroupedNotificationTags.matches.length == 0"
            @click="unsubscribeAllMatches"
          >
            Remove All
          </button>
        </div>
      </div>
      <div
        class="mt-5"
        v-if="Object.values(getGroupedNotificationTags).flat(1).length > 0"
      >
        <button
          type="button"
          class="btn btn-danger float-end"
          aria-label="Unsubscribe from everything"
          @click="removeAllNotificationTags"
        >
          Unsubscribe from everything
        </button>
      </div>
    </fieldset>
  </form>
</template>
