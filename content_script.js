// Listen for user to select text on web page
document.addEventListener("dblclick", async (event) => {
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    let response = await chrome.runtime.sendMessage({
      selectedText: selectedText,
      from: "content",
    });
    const data = response.data;
    let definition;
    if (data["title"]) {
      definition = data["title"];
    } else {
      const { meanings } = data[0];
      const definitions = meanings[0]["definitions"];
      console.log(definitions);
      if (definitions.length > 0) {
        definition = definitions[0]["definition"];
      }
    }

    var modal = document.createElement("div");
    modal.setAttribute("id", "definition-modal");
    modal.innerHTML = definition;
    modal.style.position = "absolute";
    modal.style.left = event.pageX + "px";
    modal.style.top = event.pageY + "px";
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
