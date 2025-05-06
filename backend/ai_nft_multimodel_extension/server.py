
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/classify", methods=["POST"])
def classify():
    image = request.files["image"]
    model = request.form["model"]
    filename = secure_filename(image.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(path)

    # Mock classification logic
    if model == "general":
        result = "Cat"
    elif model == "style":
        result = "Impressionism"
    elif model == "nsfw":
        result = "Safe"
    else:
        result = "Unknown"

    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(port=5000)
