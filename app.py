# flask run --port 5002

from flask import Flask, request
import json

app = Flask(__name__)


# scan for wifi networks
@app.route("/scan_wifi", methods=["GET"])
def scan_wifi():
    nets = [
        {"name": "amiga", "strength": 100},
        {"name": "farm-ng", "strength": 95},
        {"name": "farm-ng guest", "strength": 70},
        {"name": "test4", "strength": 100},
        {"name": "test5", "strength": 95},
        {"name": "test6", "strength": 70},
    ]
    return {"networks": nets}


# connect to a wifi network
@app.route("/connect", methods=["POST"])
def connect():
    try:
        body = request.data.decode("utf-8")
        bodyJ = json.loads(body)
        password = bodyJ["password"]

        if password == "1234":
            return {"result": "You did it", "connected": True}
        else:
            return {"result": "", "connected": False}, 500
    except Exception as e:
        print(e)
        return {"result": "", "connected": False}, 500


# retrieve services
@app.route("/services", methods=["GET"])
def services():
    services = [
        {"name": "farmng-canbus.service", "status": "activating"},
        {"name": "farmng-foxglove.service", "status": "stopped"},
        {"name": "farmng-launcher-frontend.service", "status": "active"},
        {"name": "farmng-launcher-backend.service", "status": "active"},
    ]
    return {"services": services}


if __name__ == "__main__":
    app.run(debug=True)