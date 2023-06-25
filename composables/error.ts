import { renderIconString } from "@/composables/icon";

type errorMessage = {
  message: string;
  severity: "info" | "warning" | "danger";
  id: string;
  buttonLabel?: string;
  buttonAction?: Function;
};

const defaultError = <errorMessage>{
  message: ``,
  severity: "info",
  id: "",
};

export const useErrors = () => useState("errors", () => defaultError);

export function displayError(error: errorMessage) {
  if (getLocalStorage(error.id, null) === null) {
    useErrors().value = error;
  }
}

export function hideError(errorId: string) {
  if (useErrors().value.id == errorId) {
    useErrors().value = defaultError;
  }
}

export function showNotificationHint() {
  if (
    /iPad|iPhone/.test(navigator?.userAgent) ||
    window?.location?.hash == "#ios-hint"
  ) {
    Promise.all([
      renderIconString("ios_share"),
      renderIconString("plus-square"),
    ]).then((iconData: Array<string>) => {
      displayError({
        message:
          "Add <b>Ticker for VCT</b> to your homescreen to enable push notifications for events and matches. Tap <b>Share " +
          iconData[0] +
          "</b> and then <b>Add to Home Screen " +
          iconData[1] +
          "</b> to enable.",
        severity: "info",
        id: "notification-hint",
      });
    });
  } else {
    displayError({
      message: `If you want to receive push notifications, please click below.`,
      severity: "info",
      id: "notification-hint",
      buttonLabel: "Turn On",
      buttonAction: () => {
        enableNotifications();
        hideError("notification-hint");
      },
    });
  }
}
