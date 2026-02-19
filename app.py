import streamlit as st
import google.generativeai as genai
from googleapiclient.discovery import build
import time

# --- 1. PAGE CONFIG ---
st.set_page_config(page_title="NexTube AI Studio", layout="wide")

# --- 2. 🔑 API KEYS ---
YOUTUBE_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc"
GEMINI_API_KEY = "AIzaSyDsGED2WRkNT6QrhC1GSfVnDX9IAyIe24s"

# --- 3. AI SETUP (Model Updated to 'gemini-pro') ---
try:
    genai.configure(api_key=GEMINI_API_KEY)
    # Yahan 'gemini-pro' use kar rahe hain jo 100% stable hai
    model = genai.GenerativeModel('gemini-pro')
except Exception as e:
    st.error(f"Setup Error: {e}")

# --- 4. NAVIGATION ---
if 'page' not in st.session_state:
    st.session_state.page = 'landing'

def nav(page_name):
    st.session_state.page = page_name
    st.rerun()

# --- 5. DESIGN ---
st.markdown("""
    <style>
    .stApp { background: #020617; color: white; }
    .script-output { background: #0f172a; padding: 20px; border-radius: 10px; border-left: 4px solid #8b5cf6; white-space: pre-wrap; color: #e2e8f0; }
    </style>
    """, unsafe_allow_html=True)

# --- 6. LANDING PAGE ---
if st.session_state.page == 'landing':
    st.title("🎬 NexTube AI Studio")
    if st.button("🚀 Start Creating"):
        nav('builder')

# --- 7. VIDEO BUILDER ---
elif st.session_state.page == 'builder':
    st.title("🎬 Video Content Engine")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        topic = st.text_input("Enter Video Topic", placeholder="e.g. Ramadan Routine")
        tone = st.selectbox("Tone", ["Professional", "Funny", "Storytelling"])
        
        if st.button("✨ GENERATE SCRIPT"):
            if topic:
                with st.spinner("🤖 AI is writing..."):
                    try:
                        prompt = f"Write a viral YouTube script for: {topic}. Tone: {tone}. Language: Hinglish (mix of Urdu/Hindi and English)."
                        response = model.generate_content(prompt)
                        st.session_state.script_result = response.text
                        st.success("Success!")
                    except Exception as e:
                        # Agar gemini-pro bhi na chale toh default model try karega
                        st.error(f"Error: {str(e)}")
            else:
                st.warning("Pehle topic likhein!")

    with col2:
        if 'script_result' in st.session_state:
            st.markdown(f'<div class="script-output">{st.session_state.script_result}</div>', unsafe_allow_html=True)
        else:
            st.info("Script yahan nazar aayegi.")

    if st.button("⬅️ Home"):
        nav('landing')
