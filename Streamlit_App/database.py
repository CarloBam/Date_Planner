import sqlite3
import json
import uuid
import zlib
import base64
from datetime import datetime

DB_FILE = "date_planner.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    # Table for sharing date plans
    c.execute('''
        CREATE TABLE IF NOT EXISTS date_plans (
            token TEXT PRIMARY KEY,
            planner_name TEXT,
            is_verified BOOLEAN,
            itinerary_json TEXT,
            allow_customization BOOLEAN,
            status TEXT, -- 'pending', 'accepted', 'rejected', 'customized'
            created_at TIMESTAMP
        )
    ''')
    
    # Try adding new columns if they do not exist
    try:
        c.execute("ALTER TABLE date_plans ADD COLUMN date_stage TEXT DEFAULT 'First Date'")
        c.execute("ALTER TABLE date_plans ADD COLUMN planned_date TEXT")
    except sqlite3.OperationalError:
        pass # Columns already exist
        
    conn.commit()
    conn.close()

def save_date_plan(planner_name, is_verified, itinerary, allow_customization, date_stage="First Date", planned_date=""):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    # Create the payload and encode it into the token directly (solves Render ephemeral DB wipe)
    payload = {
        "planner_name": planner_name,
        "is_verified": is_verified,
        "itinerary": itinerary,
        "allow_customization": allow_customization,
        "status": "pending",
        "date_stage": date_stage,
        "planned_date": planned_date
    }
    
    json_str = json.dumps(payload)
    compressed = zlib.compress(json_str.encode('utf-8'))
    token = base64.urlsafe_b64encode(compressed).decode('utf-8')
    
    c.execute('''
        INSERT OR REPLACE INTO date_plans (token, planner_name, is_verified, itinerary_json, allow_customization, status, created_at, date_stage, planned_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (token, planner_name, is_verified, json.dumps(itinerary), allow_customization, 'pending', datetime.now(), date_stage, planned_date))
    
    conn.commit()
    conn.close()
    return token

def get_date_plan(token):
    # Try SQLite First (in case status was updated and DB not wiped)
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT planner_name, is_verified, itinerary_json, allow_customization, status, date_stage, planned_date FROM date_plans WHERE token = ?', (token,))
    row = c.fetchone()
    conn.close()
    
    if row:
        return {
            "planner_name": row[0],
            "is_verified": bool(row[1]),
            "itinerary": json.loads(row[2]),
            "allow_customization": bool(row[3]),
            "status": row[4],
            "date_stage": row[5] if len(row) > 5 else "First Date",
            "planned_date": row[6] if len(row) > 6 else ""
        }
    
    # If not found in SQLite (e.g., Render DB wiped), decode from token!
    try:
        compressed = base64.urlsafe_b64decode(token.encode('utf-8'))
        json_str = zlib.decompress(compressed).decode('utf-8')
        return json.loads(json_str)
    except Exception:
        pass
        
    return None

def update_date_plan_status(token, new_status, new_itinerary=None):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    if new_itinerary:
        c.execute('UPDATE date_plans SET status = ?, itinerary_json = ? WHERE token = ?', (new_status, json.dumps(new_itinerary), token))
    else:
        c.execute('UPDATE date_plans SET status = ? WHERE token = ?', (new_status, token))
    conn.commit()
    conn.close()

# Initialize on import
init_db()
