export interface OneSignalTags {
  [key: string]: string;
}

export interface GroupedOneSignalTags {
  events: Array<string>;
  matches: Array<string>;
}

export interface OneSignalSDK {
  init: (opts: Object) => void;
  on: (eventName: string, callback: Function) => void;
  push: Function;
  showNativePrompt: () => void;
  getUserId: () => Promise<string | null>;
  getTags: () => Promise<OneSignalTags>;
  sendTag: (key: string, value: string) => Promise<OneSignalTags>;
  deleteTag: (key: string) => void;
  deleteTags: (keyList: Array<string>, callback: Function) => Promise<boolean>;
}

declare global {
  interface Window {
    OneSignal: OneSignalSDK;
  }
}

export const useOneSignal = () => window.OneSignal || [];

export const useNotifications = () =>
  useState("notificationId", () => null) as Ref<string | null>;

export const useNotificationTags = () =>
  useState("notificationTags", () => ({} as OneSignalTags));

export const isNotificationUser = computed(() => {
  return useNotifications().value !== null;
});

export const getGroupedNotificationTags = computed(() => {
  const result = <GroupedOneSignalTags>{ events: [], matches: [] };
  if (useNotificationTags().value !== null) {
    for (const label of Object.keys(useNotificationTags().value)) {
      if (!label.includes("-")) continue;
      const parts = label.split("-");

      if (parts[0] == "match") {
        result.matches.push(parts[1]);
      } else if (parts[0] == "event") {
        result.events.push(parts[1]);
      }
    }
  }
  result.events.sort();
  return result;
});

export function initNotifications() {
  useOneSignal().init({
    appId: "dafbb567-4184-4d55-8605-42bfd902bf5f",
  });

  useOneSignal().on("subscriptionChange", async (isSubscribed: boolean) => {
    console.log("The user's subscription state is now:", isSubscribed);
    useNotifications().value = isSubscribed
      ? await getNotificationUserId()
      : null;
  });

  getNotificationUserId().then((userId) => {
    useNotifications().value = userId;

    if (userId !== null) {
      getNotificationTags().then((tags) => {
        useNotificationTags().value = tags;
      });
    }
  });
}

export function getNotificationUserId() {
  return new Promise<string | null>((resolve) => {
    useOneSignal().push(() => {
      resolve(useOneSignal().getUserId());
    });
  });
}

export function getNotificationTags() {
  return new Promise<OneSignalTags>((resolve) => {
    useOneSignal().push(() => {
      resolve(useOneSignal().getTags());
    });
  });
}

export function addNotificationTag(label: string) {
  return new Promise<OneSignalTags>((resolve) => {
    useOneSignal().push(() => {
      resolve(useOneSignal().sendTag(label, "1"));
    });
    useNotificationTags().value[label] = "1";
  });
}

export function removeNotificationTag(label: string) {
  useOneSignal().push(() => {
    useOneSignal().deleteTag(label);
  });
  delete useNotificationTags().value[label];
}

export function removeNotificationTags(keyList: Array<string>) {
  return new Promise<boolean>((resolve) => {
    useOneSignal().push(() => {
      useOneSignal().deleteTags(keyList, (tagsDeleted: Array<string>) => {
        resolve(keyList.length == tagsDeleted.length);
      });
    });

    keyList.forEach((label) => delete useNotificationTags().value[label]);
  });
}

export function removeAllNotificationTags() {
  const keyList = Object.keys(useNotificationTags().value);
  return removeNotificationTags(keyList);
}

export function enableNotifications() {
  useOneSignal().push(() => {
    useOneSignal().showNativePrompt();
  });
}

export function unsubscribeAllMatches() {
  const keyList = getGroupedNotificationTags.value.matches.map(
    (el) => "match-" + el
  );
  return removeNotificationTags(keyList);
}

export function unsubscribeEvents(eventNames: Array<string>) {
  const keyList = eventNames.map((el) => "event-" + el);
  return removeNotificationTags(keyList);
}
