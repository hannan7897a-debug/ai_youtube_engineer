import streamlit as st
import google.generativeai as genai
from googleapiclient.discovery import build

# --- 1. CONFIG ---
st.set_page_config(page_title="NexTube AI Studio", layout="wide")

# --- 2. 🔑 API KEYS ---
# Inhein change mat karna, ye sahi hain
YOUTUBE_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc"
GEMINI_API_KEY = "AIzaSyDsGED2WRkNT6QrhC1GSfVnDX9IAyIe24s"

# --- 3. AI SETUP ---
try:
    genai.configure(api_key=GEMINI_API_KEY)
    # Latest specific model path
    model = genai.GenerativeModel(model_name='models/gemini-1.5-flash')
except Exception as e:
    st.error(f"Setup Error: {e}")

# --- 4. NAVIGATION ---
if 'page' not in st.session_state: st.session_state.page = 'landing'

def nav(p):
    st.session_state.page = p
    st.rerun()

# --- 5. DESIGN ---
st.markdown("<style>.stApp { background: #020617; color: white; } .script-box { background: #0f172a; padding: 20px; border-radius: 10px; border-left: 4px solid #8b5cf6; }</style>", unsafe_allow_html=True)

# --- 6. PAGES ---
if st.session_state.page == 'landing':
    st.title("🎬 NexTube AI Studio")
    if st.button("🚀 Enter Studio"): nav('builder')

elif st.session_state.page == 'builder':
    st.title("🎬 Video Content Engine")
    col1, col2 = st.columns([1, 2])
    
    with col1:
        topic = st.text_input("Enter Topic", placeholder="e.g. Ramadan Routine")
        if st.button("✨ GENERATE SCRIPT"):
            if topic:
                with st.spinner("🤖 Writing..."):
                    try:
                        # Direct generate call
                        response = model.generate_content(f"Write a YouTube script for: {topic} in Hinglish.")
                        st.session_state.res = response.text
                    except Exception as e:
                        st.error(f"Try again! Error: {str(e)}")
            else: st.warning("Topic likhein!")

    with col2:
        if 'res' in st.session_state:
            st.markdown(f'<div class="script-box">{st.session_state.res}</div>', unsafe_allow_html=True)
        else: st.info("Script will appear here.")
    
    st.button("⬅️ Home", on_click=lambda: nav('landing'))
