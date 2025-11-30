from flask import Flask, request, jsonify, send_from_directory
import os
import subprocess
from transformers import AutoTokenizer, AutoModel

# ======== Optional: Transformers setup =========
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")
print("Everything is working!")

# ======== Flask setup =========
app = Flask(__name__)

AUDIO_FOLDER = "audio_output"
os.makedirs(AUDIO_FOLDER, exist_ok=True)

# ======== Generate Audio Route =========
@app.route("/generate", methods=["POST"])
def generate_audio():
    data = request.json
    text = data.get("text")
    tone = data.get("tone", "normal")  # calm or nervous

    if not text:
        return jsonify({"error": "Text is required"}), 400

    filename = "output.wav"
    filepath = os.path.join(AUDIO_FOLDER, filename)

    speed = "0.9" if tone == "calm" else "1.2"

    # full path to tts.exe
    tts_path = r"C:\Users\hp\AppData\Local\Programs\Python\Python311\Scripts\tts.exe"

    try:
        subprocess.run([
            tts_path,
            "--text", text,
            "--model_name", "tts_models/multilingual/multi-dataset/xtts_v2",
            "--speed", speed,
            "--out_path", filepath
        ], check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({"error": "TTS generation failed", "details": str(e)}), 500

    return jsonify({
        "url": f"http://127.0.0.1:7000/audio/{filename}"
    })


# ======== Serve Audio Route =========
@app.route("/audio/<filename>")
def serve_audio(filename):
    return send_from_directory(AUDIO_FOLDER, filename)


# ======== Run Server =========
if __name__ == "_main_":
    app.run(port=7000)