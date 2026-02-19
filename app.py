import streamlit as st
import google.generativeai as genai
from googleapiclient.discovery import build
import time

# --- 1. PAGE CONFIG ---
st.set_page_config(page_title="NexTube AI Studio", layout="wide")

# --- 2. 🔑 API KEYS (Yahan Paste Karein) ---
# Apni working keys yahan quotes ke andar dalein
YOUTUBE_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc"
GEMINI_API_KEY = "AIzaSyDsGED2WRkNT6QrhC1GSfVnDX9IAyIe24s"

# --- 3. AI SETUP ---
try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    st.error(f"Setup Error: {e}")

# --- 4. NAVIGATION LOGIC ---
if 'page' not in st.session_state:
    st.session_state.page = 'landing'

def nav(page_name):
    st.session_state.page = page_name
    st.rerun()

# --- 5. DESIGN & CSS ---
st.markdown("""
    <style>
    .stApp { background: #020617; color: white; }
    .main-card { background: rgba(255,255,255,0.05); padding: 25px; border-radius: 15px; border: 1px solid #3b82f6; }
    .script-output { background: #0f172a; padding: 20px; border-radius: 10px; border-left: 4px solid #8b5cf6; white-space: pre-wrap; }
    </style>
    """, unsafe_allow_html=True)

# --- 6. LANDING PAGE ---
if st.session_state.page == 'landing':
    st.title("🎬 NexTube AI Studio")
    st.subheader("The Ultimate AI YouTube Tool")
    if st.button("🚀 Start Creating"):
        nav('builder')

# --- 7. VIDEO BUILDER (REAL AI) ---
elif st.session_state.page == 'builder':
    st.title("🎬 Video Content Engine")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.markdown("### ⚙️ Engine Settings")
        topic = st.text_input("Enter Video Topic", placeholder="e.g. History of Space")
        tone = st.selectbox("Tone", ["Funny", "Professional", "Hype", "Storytelling"])
        
        if st.button("✨ GENERATE SCRIPT"):
            if topic and GEMINI_API_KEY:
                with st.spinner("🤖 Gemini AI is writing..."):
                    try:
                        prompt = f"Write a viral YouTube script for: {topic}. Tone: {tone}. Language: Hinglish (Hindi/Urdu + English). Include Hook, Intro, and 3 Points."
                        response = model.generate_content(prompt)
                        st.session_state.script_result = response.text
                        st.success("Script Generated!")
                    except Exception as e:
                        st.error(f"API Error: {str(e)}")
            else:
                st.warning("Please enter a topic and check API key.")

    with col2:
        st.markdown("### 📜 AI Generated Content")
        if 'script_result' in st.session_state:
            st.markdown(f'<div class="script-output">{st.session_state.script_result}</div>', unsafe_allow_html=True)
        else:
            st.info("Your script will appear here after generation.")

    if st.button("⬅️ Back to Home"):
        nav('landing')
