
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from flask import render_template
from flask_cors import CORS

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///earthquakesData.sqlite")

app = Flask(__name__)
CORS(app)

@app.route('/')
def project2():
    title="earthquake"
    return render_template('index.html', title=title)

@app.route('/api_earthquake')
def earthquake():
    data = pd.read_sql("SELECT * FROM earthquake", engine)
    json_data = data.to_json(orient='records')
    return json_data
    
if __name__ == '__main__':
    app.run(debug=True)