import {
  waitForEvenAppBridge,
  TextContainerProperty,
  CreateStartUpPageContainer,
  TextContainerUpgrade,
  OsEventTypeList,
} from "@evenrealities/even_hub_sdk";

import { getPasswords, getPassword, unlock } from "./api";
import { renderMenu } from "./menu";
import { renderPassword } from "./password";

const bridge = await waitForEvenAppBridge();

let selectedId: number | null = null;

async function loadMenu() {
  const data = await getPasswords();
  
  bridge.createStartUpPageContainer(
    new CreateStartUpPageContainer({
      containerTotalNum: 1,
      textObject: [
        new TextContainerProperty({
          xPosition: 0,
          yPosition: 0,
          width: 576,
          height: 288,
          containerID: 1,
          containerName: "main",
          content: renderMenu(data),
          isEventCapture: 1,
        }),
      ],
    }),
  );
}

await loadMenu();
let unlocked = false;

bridge.onEvenHubEvent(async (event) => {
  const t = event.textEvent;
  if (!t) return;

  if (t.eventType === OsEventTypeList.CLICK_EVENT) {
    selectedId = 1;

    const appPin = import.meta.env.VITE_PASSWORD;
    const ok = await unlock(appPin);

    if (!ok.ok) return;

    unlocked = true;

    const pw = await getPassword(1);

    bridge.textContainerUpgrade(
      new TextContainerUpgrade({
        containerID: 1,
        containerName: "main",
        content: renderPassword(pw, true),
      }),
    );

    setTimeout(async () => {
      unlocked = false;
      await loadMenu();
    }, 15000);
  }
});
