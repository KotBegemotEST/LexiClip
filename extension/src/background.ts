export {};

const MENU_ID = "lexiclip-add-to-dict";

type SavedWord = {
  text: string;
  url: string;
  addedAt: number;
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Add to LexiClip",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID) return;
  if (!info.selectionText) return;

  const text = info.selectionText.trim();
  if (!text) return;

  chrome.storage.sync.get(["words"], (result) => {
    const words = (result.words as SavedWord[] | undefined) ?? [];

    const newWord: SavedWord = {
      text,
      url: tab?.url ?? "",
      addedAt: Date.now()
    };

    words.push(newWord);

    chrome.storage.sync.set({ words }, () => {
      console.log("[LexiClip] saved word:", newWord);
    });
  });
});
