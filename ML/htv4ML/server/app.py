from flask import Flask, request
from modules import ml
import os
import random
import json
import base64
import importlib.util

app = Flask(__name__)
cntr = 0
faces = 0


@app.route('/')
def hello():
    return "Hello World!"


@app.route('/getFood', methods=["GET"])
def get_food():
    score = ml.getScores()
    return score


@app.route('/getFace', methods=["GET"])
def get_face():
    person = ml.getPerson()
    return person


@app.route("/setFace", methods=["POST"])
def set_face():
    global faces
    img_encoded = request.json['image']
    image = base64.b64decode(img_encoded)
    faces += 1
    if faces < 6:
        fh = open("/home/rahultarak12345/htv4ML/testFace/" +
                  str(faces) + ".jpg", "wb")
        fh.write(image)
        fh.close()
    else:
        faces = 0
    if faces == 5:
        return "Sucess"


@app.route('/setFood', methods=["POST"])
def set_food():
    global cntr
    img_encoded = request.json['image']
    image = base64.b64decode(img_encoded)
    cntr += 1
    if cntr < 6:
        fh = open("/home/rahultarak12345/htv4ML/testImage/" +
                  str(cntr) + ".jpg", "wb")
        fh.write(image)
        fh.close()
    else:
        cntr = 0
    if cntr == 5:
        cntr = 0
        return "Sucess"


if __name__ == '__main__':
    app.run(host='0.0.0.0/0', port=8888)
