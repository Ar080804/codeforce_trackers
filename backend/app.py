from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # This allows your React app to talk to this Python server

@app.route('/api/user/<handle>', methods=['GET'])
def get_user_info(handle):
    # The official Codeforces API URL
    url = f"https://codeforces.com/api/user.info?handles={handle}"
    
    try:
        response = requests.get(url)
        data = response.json()
        
        if data['status'] == 'OK':
            user = data['result'][0]
            # We only send back the data we need
            return jsonify({
                "status": "success",
                "handle": user.get('handle'),
                "rating": user.get('rating', 0),
                "rank": user.get('rank', 'unrated'),
                "maxRating": user.get('maxRating', 0),
                "avatar": user.get('titlePhoto')
            })
        else:
            return jsonify({"status": "error", "message": "User not found"}), 404
            
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)