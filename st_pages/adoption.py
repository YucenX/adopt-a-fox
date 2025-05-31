import streamlit as st
from adoption_form_component import adoption_form_component

st.set_page_config(layout="wide")

st.markdown("# Adopt a Fox Pokémon!")

submission = adoption_form_component(preselected="Braixen")

if submission:
    st.success("Submitted successfully!")
    st.json(submission)
    st.balloons()
else:
    st.error("Please fill out the form")
