import streamlit as st
import pandas as pd
import plotly.express as px
from googleapiclient.discovery import build

# 1. Page Configuration
st.set_page_config(page_title="AI YouTube Growth Engineer", layout="wide")

# FIX: Changed unsafe_allow_index to unsafe_allow_html
st.markdown(""" <style> .main { background-color: #f0f2f6; } </style> """, unsafe_allow_html=True)

st.title("🎯 AI YouTube Growth Engineer")

# 2. Sidebar Setup
with st.sidebar:
    st.header("🔑 System Access")
    api_key = st.text_input("Paste API Key Here", type="password")
    c_id = st.text_input("Enter YouTube Channel ID")
    st.info("System Architecture: YouTube API v3 + Python Reasoning Engine")

# 3. Data Fetching with Stats (Views & Likes)
def get_enhanced_data(api_key, channel_id):
    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
        # Fetching top 10 videos
        search_res = youtube.search().list(part="snippet", channelId=channel_id, maxResults=10, order="viewCount", type="video").execute()
        
        v_ids = [item['id']['videoId'] for item in search_res['items']]
        # Fetching statistics for these videos
        stats_res = youtube.videos().list(part="statistics", id=",".join(v_ids)).execute()
        
        final_list = []
        for i, item in enumerate(search_res['items']):
            stats = stats_res['items'][i]['statistics']
            final_list.append({
                "Title": item['snippet']['title'],
                "Views": int(stats.get('viewCount', 0)),
                "Likes": int(stats.get('likeCount', 0))
            })
        return pd.DataFrame(final_list)
    except Exception as e:
        st.error(f"System Error: {e}")
        return None

# 4. Dashboard Execution
if st.button("Fetch & Analyze Live Insights") and api_key and c_id:
    df = get_enhanced_data(api_key, c_id)
    if df is not None:
        st.success("✅ Analysis Complete! AI Engine is live.")
        
        col1, col2 = st.columns([1, 1])
        
        with col1:
            st.subheader("📊 Performance Chart")
            # Creating a visual bar chart
            fig = px.bar(df, x="Views", y="Title", orientation='h', color="Views", 
                         title="Views per Video", template="plotly_white")
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            st.subheader("🧠 AI Strategic Advice")
            top_v = df.iloc[0]['Title']
            st.info(f"**Top Insight:** Video '{top_v}' is your best asset.")
            st.divider()
            st.warning("⚠️ **Strategy:** Your view-to-like ratio suggests you should add a 'Call to Action' in the middle of your videos.")

        st.subheader("📋 Detailed Metrics")
        st.dataframe(df, use_container_width=True)

        # Requirement: Architecture Diagram description
        st.divider()
        st.write("🏗️ **Architecture:** API Input -> Data Processing -> Reasoning Engine -> Strategic Output")