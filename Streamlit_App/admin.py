import streamlit as st
import sqlite3
import pandas as pd
import json
import io
import datetime
from database import DB_FILE

st.set_page_config(page_title="Management Analytics Dashboard", page_icon="⚙️", layout="wide")

st.title("⚙️ Management Analytics Dashboard")
st.markdown("Welcome to the administrative backend. Here you can generate reports on date planning activity.")

def load_data():
    conn = sqlite3.connect(DB_FILE)
    try:
        df = pd.read_sql_query("SELECT * FROM date_plans", conn)
    except Exception as e:
        df = pd.DataFrame()
    finally:
        conn.close()
    return df

df = load_data()

st.subheader("Overview")
st.metric("Total Dates Links Generated", len(df) if not df.empty else 0)

# Parse itineraries
activity_counts = {}

if not df.empty:
    for idx, row in df.iterrows():
        if pd.notna(row['itinerary_json']):
            try:
                itinerary = json.loads(row['itinerary_json'])
                for item in itinerary:
                    name = item.get("name", "Unknown")
                    category = item.get("category", "")
                    area = item.get("area", "")
                    
                    if name not in activity_counts:
                        activity_counts[name] = {"Name": name, "Category": category, "Area": area, "Times Added to Cart": 0}
                    
                    activity_counts[name]["Times Added to Cart"] += 1
            except Exception:
                pass

analytics_df = pd.DataFrame(list(activity_counts.values()))

if not analytics_df.empty:
    analytics_df = analytics_df.sort_values(by="Times Added to Cart", ascending=False).reset_index(drop=True)
    st.subheader("Business / Activity Report")
    st.dataframe(analytics_df, use_container_width=True)
    
    # Download as Excel
    excel_buffer = io.BytesIO()
    with pd.ExcelWriter(excel_buffer, engine="openpyxl") as writer:
        analytics_df.to_excel(writer, index=False, sheet_name="Analytics")
        if not df.empty:
            df.to_excel(writer, index=False, sheet_name="Raw Data")
    
    today_str = datetime.datetime.now().strftime("%Y-%m-%d")
    
    st.download_button(
        label="📥 Download Analytics (Excel)",
        data=excel_buffer.getvalue(),
        file_name=f"DateCart_Business_Analytics_{today_str}.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
else:
    st.info("No activity data available yet. Generate some dates to populate the dashboard!")
