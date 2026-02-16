import streamlit as st
import pandas as pd
import time
import google.generativeai as genai
from googleapiclient.discovery import build

# --- 1. CONFIGURATION ---
st.set_page_config(page_title="NexTube AI | Cyber Studio", layout="wide", initial_sidebar_state="collapsed")

# --- 2. 🔑 API KEYS (Dono Yahan Paste Karein) ---
YOUTUBE_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc" 
GEMINI_API_KEY = "AIzaSyCqJTZzkFhI1-GiGogb6a1h-a7NOzv9i2A"

# Gemini AI Setup
genai.configure(api_key=GEMINI_API_KEY)
ai_model = genai.GenerativeModel('gemini-1.5-flash')

# --- 3. 🎨 ULTRA-PREMIUM CSS ---
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Space+Grotesk:wght@500;700&display=swap');
    .stApp { background: radial-gradient(circle at top right, #1e1b4b, #0f172a, #020617); color: #f8fafc; font-family: 'Inter', sans-serif; }
    .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px; transition: all 0.4s ease; text-align: center; border-bottom: 4px solid rgba(59, 130, 246, 0.2); height: 250px; }
    .hero-title { font-family: 'Space Grotesk', sans-serif; font-size: 70px; font-weight: 700; background: linear-gradient(to bottom right, #ffffff, #64748b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; }
    .stButton>button { background: linear-gradient(90deg, #3b82f6, #8b5cf6) !important; border: none !important; color: white !important; padding: 12px 30px !important; border-radius: 12px !important; font-weight: 700 !important; width: 100%; transition: 0.3s; }
    .script-box { background: rgba(255,255,255,0.05); border-left: 5px solid #3b82f6; padding: 25px; border-radius: 15px; margin-top: 20px; color: #e2e8f0; }
    </style>
    """, unsafe_allow_html=True)

# --- 4. 🧭 NAVIGATION ---
if 'page' not in st.session_state: st.session_state.page = 'landing'
def navigate(p): 
    st.session_state.page = p
    st.rerun()

# --- 5. 🏠 PAGE: LANDING ---
if st.session_state.page == 'landing':
    st.markdown("<br><br><br>", unsafe_allow_html=True)
    st.markdown('<h1 class="hero-title">AI YouTube<br>Engine</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align:center; color:#94a3b8; font-size:20px;">The World\'s First AI Studio for Viral Content Creation.</p>', unsafe_allow_html=True)
    _, col_btn, _ = st.columns([2, 1, 2])
    with col_btn:
        if st.button("🚀 Enter AI Studio"): navigate('dashboard')

# --- 6. ⚡ PAGE: DASHBOARD ---
elif st.session_state.page == 'dashboard':
    st.markdown("## ⚡ Neural Dashboard")
    cols = st.columns(3)
    tools = [
        {"icon": "🎬", "name": "Video Builder", "desc": "Real AI Script Generation"},
        {"icon": "🧠", "name": "Script Genie", "desc": "Viral Hook Logic"},
        {"icon": "🎙️", "name": "Voice Lab", "desc": "AI Voiceovers"},
        {"icon": "🖼️", "name": "Thumbnail AI", "desc": "High CTR Designs"},
        {"icon": "📈", "name": "SEO Pulse", "desc": "Rank #1 on Search"},
        {"icon": "📂", "name": "Archive", "desc": "Your Projects"}
    ]
    for i, t in enumerate(tools):
        with cols[i % 3]:
            st.markdown(f'<div class="glass-card"><div style="font-size:45px;">{t["icon"]}</div><h3>{t["name"]}</h3><p style="color:#94a3b8;">{t["desc"]}</p></div>', unsafe_allow_html=True)
            if st.button(f"Launch {t['name']}", key=f"btn_{i}"):
                if t['name'] in ["Video Builder", "Script Genie"]: navigate('builder')
                if t['name'] == "SEO Pulse": navigate('seo')
    st.sidebar.button("⬅️ Logout", on_click=lambda: navigate('landing'))

# --- 7. 🎬 PAGE: BUILDER (GEMINI POWERED) ---
elif st.session_state.page == 'builder':
    st.markdown("## 🎬 AI Studio (Gemini 1.5 Pro)")
    side, main, assets = st.columns([1, 2, 1])
    
    with side:
        st.markdown("### ⚙️ Engine")
        topic = st.text_input("Enter Video Topic", placeholder="e.g. Life on Mars")
        tone = st.selectbox("Select Tone", ["Informative", "Hype", "Funny", "Dark"])
        
        if st.button("✨ GENERATE REAL SCRIPT"):
            if topic:
                with st.spinner("🤖 Gemini is writing..."):
                    try:
                        prompt = f"Write a killer YouTube script for: {topic}. Tone: {tone}. Give me a hook, intro, and body in a mix of Urdu/Hindi and English."
                        response = ai_model.generate_content(prompt)
                        st.session_state.final_script = response.text
                    except Exception as e:
                        st.error("API Error: Check your Gemini Key!")
            else: st.warning("Topic zaroori hai!")

    with main:
        if 'final_script' in st.session_state:
            st.markdown(f'<div class="script-box"><b>📜 AI SCRIPT:</b><br><br>{st.session_state.final_script}</div>', unsafe_allow_html=True)
        else:
            st.info("Script will appear here...")

    with assets:
        st.markdown("### 📦 Export")
        if st.button("🔥 Finalize Video"): st.balloons()
    
    st.button("⬅️ Back to Dashboard", on_click=lambda: navigate('dashboard'))

# --- 8. 📈 PAGE: SEO ---
elif st.session_state.page == 'seo':
    st.markdown("## 📈 YouTube Data Pulse")
    c_id = st.text_input("Channel ID")
    if st.button("Analyze"):
        st.area_chart([20, 50, 40, 100, 80])
    st.button("⬅️ Back", on_click=lambda: navigate('dashboard'))
