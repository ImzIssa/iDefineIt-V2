chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from == "content") {
    console.log("received from content script");
  }
  let word = request.selectedText;
  if (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("sending");
        sendResponse({ data: data });
      });
  }
  console.log("returning");
  return true;
});

async function getDefinition(word) {
  // Use an API or other method to look up the definition of the word
  var definition = "This is a definition of " + word;
  console.log(definition);
  var res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  var data = await res.json();

  return data;
}
