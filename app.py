import streamlit as st
import google.generativeai as genai

# --- 1. CONFIG ---
st.set_page_config(page_title="NexTube AI Studio", layout="wide")

# --- 2. 🔑 API KEYS ---
# Aapki ye keys bilkul sahi hain (sssss.gif se confirmed)
YOUTUBE_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc"
GEMINI_API_KEY = "AIzaSyDsGED2WRkNT6QrhC1GSfVnDX9IAyIe24s"

# --- 3. AI SETUP ---
genai.configure(api_key=GEMINI_API_KEY)

# --- 4. NAVIGATION ---
if 'page' not in st.session_state: st.session_state.page = 'landing'

def nav(p):
    st.session_state.page = p
    st.rerun()

# --- 5. PAGES ---
if st.session_state.page == 'landing':
    st.title("🎬 NexTube AI Studio")
    if st.button("🚀 Enter Studio"): nav('builder')

elif st.session_state.page == 'builder':
    st.title("🎬 Video Content Engine")
    topic = st.text_input("Enter Topic", placeholder="e.g. Ramadan Tips")
    
    if st.button("✨ GENERATE SCRIPT"):
        if topic:
            with st.spinner("🤖 Calling Gemini Engine..."):
                # Hum multiple models try karenge taake error na aaye
                success = False
                for model_name in ['gemini-1.5-flash', 'gemini-pro']:
                    if success: break
                    try:
                        model = genai.GenerativeModel(model_name)
                        response = model.generate_content(f"Write a YouTube script for: {topic} in Hinglish.")
                        st.session_state.res = response.text
                        success = True
                        st.success(f"Generated using {model_name}")
                    except Exception as e:
                        continue # Try next model
                
                if not success:
                    st.error("Google is taking too long or keys are still syncing. Please wait 2 minutes and try again.")
        else:
            st.warning("Topic likhein pehle!")

    if 'res' in st.session_state:
        st.markdown(f"### 📜 Script Results:\n{st.session_state.res}")

    st.button("⬅️ Back", on_click=lambda: nav('landing'))
