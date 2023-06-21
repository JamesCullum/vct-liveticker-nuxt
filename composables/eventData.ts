import { Unsubscribe, doc, onSnapshot, getDoc } from "firebase/firestore";

export const statusLookup = ["Upcoming", "Live", "Finished"];
export const statusCardClassLookup = ["secondary", "danger", "success"];

export interface eventListInterface {
  [key: string]: eventItemInterface | DateInterface;
}

export interface eventItemInterface {
  [status: number]: matchItemInterface[];
}

export interface matchItemInterface {
  team1: string;
  team2: string;
  date: DateInterface;
  event: string;
  id: number;
  stage: string;
  status: number;
  stream?: string;
  map1?: number;
  map2?: number;
  round1?: number;
  round2?: number;
}

export interface DateInterface {
  seconds: number;
  nanoseconds: number;
}

export const useEvents = () => useState("events", () => <eventListInterface>{});

export const getEventDocRef = () => doc(getFireStore(), "events", "current");

export function dateFormat(dateTime: DateInterface): string {
  return new Date(dateTime.seconds * 1000).toLocaleString(navigator.language, {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeDiffSeconds(dateTime: DateInterface): number {
  return Math.abs(dateTime.seconds * 1000 - Date.now());
}

export function getTimeDiff(dateTime: DateInterface): string {
  var diff = getTimeDiffSeconds(dateTime);

  var msec = diff;
  var dd = Math.floor(msec / 1000 / 60 / (60 * 24));
  if (dd > 0) return dd + "D";

  var hh = Math.floor(msec / 1000 / 60 / 60);
  if (hh > 0) return hh + "H";

  var mm = Math.floor(msec / 1000 / 60);
  if (mm > 0) return mm + "M";

  var ss = Math.floor(msec / 1000);
  if (msec > 0) return ss + "S";

  return "NOW";
}

export function onEventListUpdate(callback: Function): Unsubscribe {
  return onSnapshot(getEventDocRef(), (doc) => {
    try {
      const result = doc.data() as eventListInterface;
      callback(processEventList(result));
    } catch {
      callback(false);
    }
  });
}

export async function getEvents(): Promise<eventListInterface> {
  const docRef = getEventDocRef();
  const data = await getDoc(docRef);
  return processEventList(data.data() as eventListInterface);
}

function processEventList(events: eventListInterface): eventListInterface {
  delete events["_updated"];

  return events;
}

export function getOrderedEventNames(
  events: eventListInterface
): Array<string> {
  return Object.keys(events).sort((a, b) => {
    const aCount = Object.values(events[a]).flat(1).length;
    const bCount = Object.values(events[b]).flat(1).length;
    if (aCount < bCount) return 1;
    if (aCount > bCount) return -1;
    return 0;
  });
}

export function getOrderedMatchItems(
  eventItem: eventItemInterface
): Array<matchItemInterface> {
  return Object.values(eventItem)
    .flat(1)
    .sort((a: matchItemInterface, b: matchItemInterface) => {
      const aDiff = getTimeDiffSeconds(a.date);
      const bDiff = getTimeDiffSeconds(b.date);
      if (aDiff > bDiff) return 1;
      if (aDiff < bDiff) return -1;
      return 0;
    });
}
