import requests

url = "http://35.188.12.206:5000/setFace"

import cv2
import time
import base64
import json
count = 0
size = 4
webcam = cv2.VideoCapture(6)
webcam.set(3,1280)
webcam.set(4,1024)
webcam.set(cv2.CAP_PROP_EXPOSURE, 40)
classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
while count < 5:
    (rval, im) = webcam.read()
    im=cv2.flip(im,1,0) #Flip to act as a mirror

    mini = cv2.resize(im, (im.shape[1] / size, im.shape[0] / size))

    faces = classifier.detectMultiScale(mini)

    for f in faces:
        time.sleep(0.005)
        print"Hello"
        (x, y, w, h) = [v * size for v in f] #Scale the shapesize backup
        cv2.rectangle(im, (x, y), (x + w, y + h),(0,255,0),thickness=4)
        #Save just the cropped face
        sub_face = im[y:y+h, x:x+w]
        FaceFileName = "image_" + str(y) + ".jpg"
        cv2.imwrite(FaceFileName, sub_face)
        # Post the cropped face
        files = {'image': base64.b64encode(open(FaceFileName, 'rb').read()),'location': 'Toronto'}
        headers = {
            'Content-Type': "multipart/form-data",
            'accept': "application/json",
            'apikey': "API0KEY0"
            }
        response = requests.post(url, json =files)
        if (response.text == "Sucess"):
            count = 0
            break;
        count += 1
        time.sleep(0.05)
    # Show the image
    cv2.imshow('Face detected',   im)
    key = cv2.waitKey(2)
    # if Esc key is press then break out of the loop
    #if key == 27: #Esc key
    #break