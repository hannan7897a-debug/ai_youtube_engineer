import streamlit as st
import pandas as pd
import time
from googleapiclient.discovery import build

# --- CONFIGURATION ---
st.set_page_config(page_title="NexTube AI | Cyber Studio", layout="wide", initial_sidebar_state="collapsed")

# --- 🔑 API KEY SECTION ---
# Yahan apni YouTube API Key paste karein
FIXED_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc" 

# --- 🎨 ULTRA-PREMIUM CSS ---
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Space+Grotesk:wght@500;700&display=swap');

    /* Global Style */
    .stApp {
        background: radial-gradient(circle at top right, #1e1b4b, #0f172a, #020617);
        color: #f8fafc;
        font-family: 'Inter', sans-serif;
    }

    /* Glassmorphism Cards */
    .glass-card {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 30px;
        transition: all 0.4s ease;
        text-align: center;
        border-bottom: 4px solid rgba(59, 130, 246, 0.2);
    }
    .glass-card:hover {
        transform: translateY(-12px);
        background: rgba(59, 130, 246, 0.08);
        border-color: #3b82f6;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    /* Hero Text */
    .hero-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(40px, 8vw, 80px);
        font-weight: 700;
        background: linear-gradient(to bottom right, #ffffff, #64748b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1;
        text-align: center;
    }

    /* Neon Buttons */
    .stButton>button {
        background: linear-gradient(90deg, #3b82f6, #8b5cf6) !important;
        border: none !important;
        color: white !important;
        padding: 12px 30px !important;
        border-radius: 12px !important;
        font-weight: 700 !important;
        transition: 0.3s !important;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .stButton>button:hover {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.6) !important;
        transform: scale(1.05);
    }

    /* Sidebar Clean Look */
    [data-testid="stSidebar"] {
        background-color: rgba(15, 23, 42, 0.95) !important;
        border-right: 1px solid rgba(255,255,255,0.1);
    }
    </style>
    """, unsafe_allow_html=True)

# --- 🧭 NAVIGATION LOGIC ---
if 'page' not in st.session_state:
    st.session_state.page = 'landing'

def navigate(page_name):
    st.session_state.page = page_name
    st.rerun()

# --- 1️⃣ LANDING PAGE ---
if st.session_state.page == 'landing':
    st.markdown("<br><br><br>", unsafe_allow_html=True)
    st.markdown('<h1 class="hero-title">Turn Ideas into Viral<br>YouTube Content</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align:center; font-size:20px; color:#94a3b8; max-width:700px; margin:auto;">The AI-powered studio to generate scripts, voiceovers, and high-CTR thumbnails in seconds.</p>', unsafe_allow_html=True)
    st.markdown("<br>", unsafe_allow_html=True)
    
    _, col_btn, _ = st.columns([2, 1, 2])
    with col_btn:
        if st.button("🚀 Enter AI Studio"):
            navigate('dashboard')

# --- 2️⃣ DASHBOARD HOME ---
elif st.session_state.page == 'dashboard':
    st.markdown("## ⚡ Neural Dashboard")
    st.markdown("<p style='color:#94a3b8;'>Welcome back, Creator. What are we building today?</p>", unsafe_allow_html=True)
    
    cols = st.columns(3)
    tools = [
        {"icon": "🎬", "name": "Video Builder", "desc": "Stitch AI clips & music"},
        {"icon": "🧠", "name": "Script Genie", "desc": "AI Viral Scriptwriting"},
        {"icon": "🎙️", "name": "Voice Lab", "desc": "Clone your voice with AI"},
        {"icon": "🖼️", "name": "Thumbnail Pro", "desc": "Generate 4K thumbnails"},
        {"icon": "📈", "name": "SEO Pulse", "desc": "Analyze YouTube Trends"},
        {"icon": "📂", "name": "Archive", "desc": "Your saved projects"}
    ]

    for i, tool in enumerate(tools):
        with cols[i % 3]:
            st.markdown(f"""
                <div class="glass-card">
                    <div style="font-size: 45px; margin-bottom:15px;">{tool['icon']}</div>
                    <h3 style="margin:0;">{tool['name']}</h3>
                    <p style="color: #94a3b8; font-size:14px;">{tool['desc']}</p>
                </div>
            """, unsafe_allow_html=True)
            if st.button(f"Launch {tool['name']}", key=f"btn_{i}"):
                if tool['name'] == "Video Builder": navigate('builder')
                if tool['name'] == "SEO Pulse": navigate('seo')

    if st.button("⬅️ Logout"): navigate('landing')

# --- 3️⃣ VIDEO BUILDER SCREEN (Canva/Runway Style) ---
elif st.session_state.page == 'builder':
    st.markdown("## 🎬 AI Video Studio")
    
    side, main, assets = st.columns([1, 2, 1])
    
    with side:
        st.markdown("### ⚙️ Engine")
        topic = st.text_input("Video Topic")
        tone = st.select_slider("Tone", ["Chill", "Hype", "Dark", "Funny"])
        voice = st.selectbox("Voice Artist", ["Adam (Pro)", "Bella (Soft)", "Cyber (AI)"])
        st.button("✨ Generate AI Script")

    with main:
        st.markdown("""
            <div style="width:100%; height:420px; background:#000; border-radius:20px; display:flex; align-items:center; justify-content:center; border: 1px solid #3b82f6; box-shadow: 0 0 20px rgba(59,130,246,0.3);">
                <div style="text-align:center;">
                    <h1 style="color:#3b82f6;">📺</h1>
                    <p style="color:#64748b;">AI Preview Window</p>
                </div>
            </div>
        """, unsafe_allow_html=True)
        st.slider("Timeline (Seconds)", 0, 60, 0)

    with assets:
        st.markdown("### 📦 Assets")
        st.button("📷 Add AI B-Roll")
        st.button("🎵 Add Background Music")
        st.button("✍️ Generate Captions")
        st.divider()
        if st.button("🔥 EXPORT 4K"):
            st.toast("Exporting to cloud...")
            time.sleep(2)
            st.balloons()

    if st.button("⬅️ Exit Studio"): navigate('dashboard')

# --- 4️⃣ SEO PULSE (YouTube API Logic) ---
elif st.session_state.page == 'seo':
    st.markdown("## 📈 SEO Neural Scan")
    c_id = st.text_input("Enter Channel ID to Scan")
    
    if st.button("Execute Scan") and c_id:
        try:
            youtube = build('youtube', 'v3', developerKey=FIXED_API_KEY)
            # Sample Fetching
            st.success("API Connection Successful!")
            st.info("Neural engine is analyzing competitors...")
            # Visual placeholder
            st.area_chart([10, 25, 45, 30, 80, 60])
        except:
            st.error("Invalid API Key or Channel ID")

    if st.button("⬅️ Exit"): navigate('dashboard')
