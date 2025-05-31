# multipage.py

import streamlit as st

pages = {
    "Fennec": st.Page("st_pages/fennec.py", title="Adopt a Fox", icon="🦊")
}

pg = st.navigation(list(pages.values()))

pg.run()
