import streamlit as st
import pandas as pd
import plotly.express as px
from googleapiclient.discovery import build
import time

# --- STAGE 1: THEME & FONT SETUP ---
st.set_page_config(page_title="NexTube AI | School of Growth", layout="wide")

# Google Fonts & Advanced Animations
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Inter:wght@400;700&display=swap');

    /* Background Animation */
    .stApp {
        background: #00c9ff;  /* Fallback */
        background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
        animation: mesh 10s ease infinite;
    }
    
    @keyframes mesh {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* Main Title Styling (Your Image Inspiration) */
    .hero-text {
        font-family: 'Bungee', cursive;
        font-size: 80px;
        line-height: 0.9;
        color: #ff5f6d;
        text-transform: uppercase;
        margin-bottom: 0px;
        text-shadow: 4px 4px 0px #ffffff;
    }

    .sub-hero {
        font-family: 'Inter', sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
        background: #ffffff;
        display: inline-block;
        padding: 5px 20px;
        border-radius: 50px;
        margin-top: 10px;
    }

    /* Floating Cards */
    div[data-testid="metric-container"] {
        background: white !important;
        border: 4px solid #1e293b;
        border-radius: 25px;
        box-shadow: 8px 8px 0px #1e293b;
        transition: 0.3s;
    }
    
    div[data-testid="metric-container"]:hover {
        transform: rotate(-2deg) scale(1.05);
    }

    /* Funky Buttons */
    .stButton>button {
        background: #ff5f6d !important;
        color: white !important;
        font-family: 'Bungee', cursive !important;
        font-size: 25px !important;
        border: 4px solid #1e293b !important;
        border-radius: 20px !important;
        box-shadow: 6px 6px 0px #1e293b !important;
        height: 80px !important;
        transition: 0.2s;
    }
    
    .stButton>button:hover {
        box-shadow: 2px 2px 0px #1e293b !important;
        transform: translate(4px, 4px);
    }

    /* Sidebar - Clean & Modern */
    [data-testid="stSidebar"] {
        background-color: white !important;
        border-right: 5px solid #1e293b;
    }
    </style>
    """, unsafe_allow_html=True)

# --- BACKEND CONFIG ---
FIXED_API_KEY = "AIzaSyC6VmRzwj1BGBcZwSkAIJT6QiuDlq2o_xc"

# --- HERO SECTION ---
col_left, col_right = st.columns([2, 1])

with col_left:
    st.markdown('<h1 class="hero-text">NEXTUBE<br>ENGINEER</h1>', unsafe_allow_html=True)
    st.markdown('<p class="sub-hero">THE FUTURE OF CONTENT LEADERS 🚀</p>', unsafe_allow_html=True)

with col_right:
    # Adding a placeholder for Lottie or Image
    st.image("https://cdn-icons-png.flaticon.com/512/3046/3046124.png", width=250)

st.divider()

# --- INPUT AREA ---
with st.sidebar:
    st.markdown("### 🛠️ MISSION CONTROL")
    c_id = st.text_input("CHANNEL ID", placeholder="UC...")
    st.info("Input ID to activate Neural Sensors")

# --- ANALYSIS ENGINE ---
if st.button("LAUNCH AI AUDIT ⚡") and c_id:
    with st.spinner("🤖 Neural Engine is Calculating..."):
        # API Logic
        youtube = build('youtube', 'v3', developerKey=FIXED_API_KEY)
        req = youtube.search().list(part="snippet", channelId=c_id, maxResults=10, order="viewCount", type="video").execute()
        v_ids = [i['id']['videoId'] for i in req['items']]
        stats = youtube.videos().list(part="statistics", id=",".join(v_ids)).execute()
        
        data = []
        for i, item in enumerate(req['items']):
            s = stats['items'][i]['statistics']
            data.append({
                "Title": item['snippet']['title'][:20],
                "Views": int(s.get('viewCount', 0))
            })
        df = pd.DataFrame(data)
        time.sleep(1.5)

    # Display Metrics in Funky Style
    m1, m2, m3 = st.columns(3)
    m1.metric("VIRAL SCORE", "99/100")
    m2.metric("ENERGY LEVEL", "MAX")
    m3.metric("NEXT REACH", f"{df['Views'].max()*3:,}")

    # Colorful Chart
    st.write("### 📊 AUDIENCE ENERGY MAP")
    fig = px.bar(df, x="Title", y="Views", color="Views", 
                 color_continuous_scale=['#ff5f6d', '#ffc371'], 
                 template="presentation")
    fig.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', font_family="Inter")
    st.plotly_chart(fig, use_container_width=True)

    # Strategy Box
    st.markdown(f"""
        <div style="background: white; border: 5px solid #1e293b; padding: 30px; border-radius: 30px; box-shadow: 10px 10px 0px #ff5f6d;">
            <h2 style="font-family: 'Bungee'; color: #1e293b;">🧠 AI STRATEGY:</h2>
            <p style="font-size: 20px; color: #1e293b;">Your data shows massive energy! 
            <b>Strategy:</b> Stop making long intros. Your audience wants fast-paced 
            visuals and bold text. Next video: "The Secret to {df.iloc[0]['Title']}..."</p>
        </div>
    """, unsafe_allow_html=True)

else:
    st.write("### 🚦 Waiting for Launch...")
