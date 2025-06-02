// Streamlit messaging helpers
function postToStreamlit(type: string, data = {}) {
  window.parent.postMessage({
    isStreamlitMessage: true,
    type: type,
    ...data,
  }, "*");
}

export function initStreamlit() {
  postToStreamlit("streamlit:componentReady", { apiVersion: 1 });
}

export function setFrameHeight(height: number) {
  postToStreamlit("streamlit:setFrameHeight", { height: height });
}

// The `data` argument can be any JSON-serializable value.
function sendDataToPython(data: {value: object, dataType: string}) {
  postToStreamlit("streamlit:setComponentValue", data);
}

export function sendJsonToPython(obj: object) {
  sendDataToPython({value: obj, dataType: "json"});
}
