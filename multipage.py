import streamlit as st

pages = {
    "Adoption": st.Page("st_pages/adoption.py", title="Adopt a Fox", icon="🦊"),
    "Breeding Tree": st.Page("st_pages/breeding_tree.py", title="Fox Breeding Tree", icon="💞"),
}

pg = st.navigation(list(pages.values()))

pg.run()
