/**
 * function to create and display title bar
 */

const { ipcRenderer } = require("electron");

// Function to create a div element with a specified class
function createDivWithClass(className) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

// Add minimize and maximize buttons if needed (similar to closeButton)
// ...

// Add event listeners for each button

function titlebar({ title = "Open Overlay" }) {
  var titleBarDiv = createDivWithClass("title-bar");
  var title = createDivWithClass("title");
  title.innerHTML = "Open Overlay";
  titleBarDiv.appendChild(title);

  var controls = createDivWithClass("controls");
  titleBarDiv.appendChild(controls);
  // Function to add a button to the controls container
  function addButtonToControls(className, clickHandler) {
    const button = createDivWithClass(className);
    button.addEventListener("click", clickHandler);
    controls.appendChild(button);
  }
  // Event listener for the close button
  function handleCloseButtonClick() {
    ipcRenderer.send("close-app");
    console.log("close button clicked!");
  }
  addButtonToControls("minimize" /* minimize click handler */);
  addButtonToControls("maximize" /* maximize click handler */);
  addButtonToControls("close", handleCloseButtonClick);
  return titleBarDiv;
}
