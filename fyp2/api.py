from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/run_test2', methods=['POST'])
def run_test2():
    try:
        result = subprocess.run(['python', 'test2.py'], capture_output=True, text=True)
        return jsonify({
            'success': True,
            'stdout': result.stdout,
            'stderr': result.stderr
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
