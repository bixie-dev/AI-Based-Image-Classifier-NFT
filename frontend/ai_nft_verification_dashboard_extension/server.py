
from flask import Flask, jsonify, request
import uuid

app = Flask(__name__)

# Mock database of pending classifications
PENDING = [
    {"id": str(uuid.uuid4()), "image": "https://via.placeholder.com/100", "prediction": "Dog"},
    {"id": str(uuid.uuid4()), "image": "https://via.placeholder.com/100", "prediction": "Landscape"},
]

@app.route("/pending", methods=["GET"])
def get_pending():
    return jsonify(PENDING)

@app.route("/verify", methods=["POST"])
def verify():
    data = request.get_json()
    global PENDING
    PENDING = [item for item in PENDING if item["id"] != data["id"]]
    return jsonify({"status": "verified"})

if __name__ == "__main__":
    app.run(port=5000)
