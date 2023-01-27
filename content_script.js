// Listen for user to select text on web page
document.addEventListener("dblclick", async (event) => {
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    let response = await chrome.runtime.sendMessage({
      selectedText: selectedText,
      from: "content",
    });
    console.log(response.data);
    const data = response.data;
    let definition;
    if (data["title"]) {
      definition = data["title"];
    } else {
      const { meanings } = data[0]; //partOfSpeech = noun
      const definitions = meanings[0]["definitions"];
      console.log(definitions);
      if (definitions.length > 0) {
        definition = definitions[0]["definition"];
      }
    }

    var modal = document.createElement("div");
    modal.setAttribute("id", "definition-modal");
    modal.innerHTML = definition;
    const temp = event.target.getBoundingClientRect();
    const center = (temp.left + temp.right) / 2;
    const top = temp.bottom - 3;
    modal.style.position = "absolute";
    modal.style.left = center + "px";
    // modal.style.left = event.pageX + "px";
    // modal.style.top = top + "px";
    modal.style.top = event.pageY + 10 + "px";
    modal.style.backgroundColor = "black";
    modal.style.color = "white";
    modal.style.padding = "10px";
    modal.style.zIndex = "9999";
    document.body.appendChild(modal);
  }
});
document.addEventListener("mouseup", (event) => {
  if (document.getElementById("definition-modal")) {
    // Remove the element
    console.log("exists");
    document.getElementById("definition-modal").remove();
  }
});
