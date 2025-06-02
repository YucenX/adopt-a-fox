import streamlit.components.v1 as components

_DEV_SERVER = "http://localhost:5173"
PRODUCTION = True

if PRODUCTION:
    svelte_component = components.declare_component(
        "svelte",
        path="./svelte_component/dist"
    )
else:
    svelte_component = components.declare_component(
        "svelte",
        url=_DEV_SERVER
    )
