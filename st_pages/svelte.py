import streamlit as st

from svelte_component import svelte_component

st.set_page_config(layout="wide")

st.markdown("# Adopt-a-Fox Editor")

submission = svelte_component()

if submission:
    st.success("Data received!")
    st.image(submission["img"])
    st.balloons()
else:
    st.error("No data received yet!")
