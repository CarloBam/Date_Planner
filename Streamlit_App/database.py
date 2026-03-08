import sqlite3
import json
import uuid
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
    conn.commit()
    conn.close()

def save_date_plan(planner_name, is_verified, itinerary, allow_customization):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    token = str(uuid.uuid4())[:8] # Short clean token
    
    c.execute('''
        INSERT INTO date_plans (token, planner_name, is_verified, itinerary_json, allow_customization, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (token, planner_name, is_verified, json.dumps(itinerary), allow_customization, 'pending', datetime.now()))
    
    conn.commit()
    conn.close()
    return token

def get_date_plan(token):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('SELECT planner_name, is_verified, itinerary_json, allow_customization, status FROM date_plans WHERE token = ?', (token,))
    row = c.fetchone()
    conn.close()
    
    if row:
        return {
            "planner_name": row[0],
            "is_verified": bool(row[1]),
            "itinerary": json.loads(row[2]),
            "allow_customization": bool(row[3]),
            "status": row[4]
        }
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
