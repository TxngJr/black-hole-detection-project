import threading
import serial
import cv2
import requests
import os

url = 'http://gps.utc.ac.th:3000/api/upload-black-hole'
folder_path = "img/"

gps = serial.Serial("/dev/ttyS0", baudrate=9600)
cap = cv2.VideoCapture(0)

cascade_hold = cv2.CascadeClassifier('cascade.xml')

is_hold_detect = False

lat = 0.0
lon = 0.0
hold = 0

def read_gps():
    global lat, lon
    while True:
        gps_raw_data = gps.readline().decode('utf-8')
        if gps_raw_data.startswith("$GPGGA"):
            data = gps_raw_data.split(",")
            new_lat = round(float(data[2][:2]) + float(data[2][2:]) / 60, 7)
            new_lon = round(float(data[4][:3]) + float(data[4][3:]) / 60, 7)
            lat = new_lat
            lon = new_lon

gps_thread = threading.Thread(target=read_gps)
gps_thread.daemon = True
gps_thread.start()

while True:
    key = cv2.waitKey(1) & 0xFF
    if key == 27:
        break
    elif key == 112 or key == 80:
        for filename in os.listdir(folder_path):
            if not filename.endswith(('.jpg')):
                print("error")
            image_path = os.path.join(folder_path, filename)
            with open(image_path, 'rb') as file:
                files = {'image': (filename, file, 'image/jpeg')}
                try:
                    response = requests.post(url, files=files)
                    if response.status_code == 201:
                        os.remove(image_path)
                        print('File uploaded successfully!')
                    else:
                        print(f'Failed to upload file. Status code: {response.status_code}')
                except:
                    print("error")
    ret, frame = cap.read()
    if ret:
        hold = cascade_hold.detectMultiScale(frame)
        if key == 115 or key == 83:
            hold = [[0,0,0,0]]
        for (x, y, w, h) in hold:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.imshow('Webcam', frame)
        if len(hold) > 0:
            if not is_hold_detect:
                is_hold_detect = True
                filename = f"{folder_path}{lat}, {lon}.jpg"
                cv2.imwrite(filename, frame)
        else:
            is_hold_detect = False
             
cap.release()
cv2.destroyAllWindows()
