
function sendMessageToStreamlitClient(type: string, data: object) {
  const outData = Object.assign({
    isStreamlitMessage: true,
    type: type,
  }, data);
  window.parent.postMessage(outData, "*");
}

export function initStreamlit() {
  sendMessageToStreamlitClient("streamlit:componentReady", {apiVersion: 1});
}

export function setFrameHeight(height: number) {
  sendMessageToStreamlitClient("streamlit:setFrameHeight", {height: height});
}

// The `data` argument can be any JSON-serializable value.
function sendDataToPython(data: {value: object, dataType: string}) {
  sendMessageToStreamlitClient("streamlit:setComponentValue", data);
}

export function sendJsonToPython(data: object) {
  sendDataToPython({value: data, dataType: "json"});
}
