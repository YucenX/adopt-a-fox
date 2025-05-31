import streamlit.components.v1 as components

_DEV_SERVER = "http://localhost:5173"
PRODUCTION = True

if PRODUCTION:
    breeding_tree_component = components.declare_component(
        "breeding_tree",
        path="./breeding_tree_component/dist"
    )
else:
    breeding_tree_component = components.declare_component(
        "breeding_tree",
        url=_DEV_SERVER
    )
