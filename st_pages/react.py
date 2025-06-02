import streamlit as st

from react_component import react_component

st.set_page_config(layout="wide")

st.markdown("# Adopt-a-Fox Editor")

submission = react_component()

if submission:
    st.success("Data received!")
    st.image(submission["img"])
    st.balloons()
else:
    st.error("No data received yet!")
