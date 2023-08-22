const { contextBridge, ipcRenderer } = require("electron");

function closestMatch(elem, selector) {
  while (elem) {
    if (elem.matches(selector)) return elem;
    elem = elem.parentElement;
  }
  return null;
}

contextBridge.exposeInMainWorld("myAPI", {
  navigate: (endpoint) => ipcRenderer.send("navigate", endpoint),
  // your other functions
});

document.addEventListener("click", function (event) {
  let card = closestMatch(event.target, ".card");
  if (card) {
    const endpoint = card.getAttribute("data-endpoint");
    console.log(`Clicked on card with endpoint ${endpoint}`);
    myAPI.navigate(endpoint);  // Using the exposed navigate function
  }
});
