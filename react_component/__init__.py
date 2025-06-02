import streamlit.components.v1 as components

_DEV_SERVER = "http://localhost:5173"
PRODUCTION = False

if PRODUCTION:
    react_component = components.declare_component(
        "react",
        path="./react_component/dist"
    )
else:
    react_component = components.declare_component(
        "react",
        url=_DEV_SERVER
    )
