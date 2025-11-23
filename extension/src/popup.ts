export {};

type SavedWord = {
  text: string;
  url: string;
  addedAt: number;
};

function renderWords(words: SavedWord[]) {
  const list = document.getElementById("words") as HTMLUListElement;
  list.innerHTML = "";

  if (!words.length) {
    const li = document.createElement("li");
    li.textContent = "No saved words yet. Select text and choose Add to LexiClip.";
    list.appendChild(li);
    return;
  }

  for (const w of words) {
    const li = document.createElement("li");

    const title = document.createElement("strong");
    title.textContent = w.text;

    const meta = document.createElement("small");
    const date = new Date(w.addedAt).toLocaleString();
    const host = w.url ? new URL(w.url).hostname : "";
    meta.textContent = host ? `${date} - ${host}` : date;

    li.appendChild(title);
    li.appendChild(document.createElement("br"));
    li.appendChild(meta);

    list.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["words"], (result) => {
    console.log(result)
    const words = (result.words as SavedWord[] | undefined) ?? [];
    renderWords(words);
  });

  let clearWordsButton = document.getElementById("clear");
    clearWordsButton?.addEventListener("click", () => {
        clearWords() 
    })
});


function clearWords() {
    chrome.storage.sync.set({ words: [] }, () => {
        renderWords([]);
    })
}