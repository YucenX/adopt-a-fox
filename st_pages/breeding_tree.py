import streamlit as st

from breeding_tree_component import breeding_tree_component

st.set_page_config(layout="wide")

st.markdown("# Customize your Fox's ancestry!")

submission = breeding_tree_component()

if submission:
    st.success("Data received!")
    st.image(submission["img"])
    st.balloons()
else:
    st.error("You have not submitted any Fox's ancestry yet.")
