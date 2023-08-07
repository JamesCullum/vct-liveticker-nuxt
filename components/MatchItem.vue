<script lang="ts" setup>
  const props = defineProps<{
    match: MatchItemInterface;
  }>();
</script>

<template>
  <div class="col-sm-6 col-lg-4 mb-2">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-8 left-info">
            <p class="stage-name m-0">
              {{ match.stage }}
            </p>
            <p class="event-date m-0">
              {{ dateFormat(match.date) }}
            </p>
          </div>
          <div class="col-4 text-end right-info">
            <p class="status-label m-0">
              {{ statusLookup[match.status].toUpperCase() }}
            </p>
            <p class="event-date-diff m-0">
              <MatchTimeLabel
                :status="match.status"
                :dateTime="match.date"
                :hasStream="'stream' in match"
              />
            </p>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="row">
          <div class="col-6 team-side">
            <div class="team-name">
              {{ match.team1 }}
            </div>
            <div class="team-score">
              {{ "map1" in match ? match.map1 : "-" }}
              {{ "round1" in match ? "(" + match.round1 + ")" : "" }}
            </div>
          </div>
          <div class="col-6 text-end team-side">
            <div class="team-name">
              {{ match.team2 }}
            </div>
            <div class="team-score">
              {{ "map2" in match ? match.map2 : "-" }}
              {{ "round2" in match ? "(" + match.round2 + ")" : "" }}
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="row">
          <div class="col-8">
            <SubscriptionButton
              class="btn-sm"
              type="match"
              :label="match.id.toString()"
            />
          </div>
          <div class="col-4 text-end">
            <NuxtLink
              :to="'https://www.vlr.gg/' + match.id + '/details'"
              target="_blank"
              class="btn btn-sm btn-light w-100"
              >Details</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
