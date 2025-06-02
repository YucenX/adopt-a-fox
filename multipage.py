import streamlit as st

pages = {
    "Svelte": st.Page("st_pages/svelte.py", title="Adopt-a-Fox Editor", icon="🦊"),
    "React": st.Page("st_pages/react.py", title="Adopt-a-Fox Editor", icon="✨"),
    "Adoption": st.Page("st_pages/adoption.py", title="Legacy Adopt-a-Fox Form", icon="💞"),
}

pg = st.navigation(list(pages.values()))

pg.run()
