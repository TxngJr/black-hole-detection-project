import threading
import serial
import cv2
import requests
import os

macAddress = ''
while macAddress == '':
    with open('/sys/class/net/eth0/address') as f:
        macAddress = f.read()

url = 'http://gps.utc.ac.th:3000'
img_folder = 'img/'
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
        try:
            gps_raw_data = gps.readline().decode('utf-8')
            if gps_raw_data.startswith("$GPGGA"):
                data = gps_raw_data.split(",")
                new_lat = round(float(data[2][:2]) + float(data[2][2:]) / 60, 7)
                new_lon = round(float(data[4][:3]) + float(data[4][3:]) / 60, 7)
                lat = new_lat
                lon = new_lon
                print("gps success")
        except:
            print("error to get gps")


gps_thread = threading.Thread(target=read_gps)
gps_thread.daemon = True
gps_thread.start()


def uploadImgToCloud():
    try:
        response = requests.post(url + "/machines/generate-machine", json={"macAddress": macAddress})
        if response.status_code != 200:
            return print("error getting machineId")
        _machineId = response.json()
        print(_machineId)
        for filename in os.listdir(img_folder):
            if not filename.endswith(('.jpg')):
                print("error file it not be .jpg")
                continue
            image_path = os.path.join(img_folder, filename)
            with open(image_path, 'rb') as file:
                response = requests.post(url + "/holds", files={'image': (filename, file, 'image/jpeg')},
                                         data={'_machineId': _machineId})
                if response.status_code != 201:
                    print("error to upload image")
                    continue
                file.close()
                os.remove(image_path)
                print('File uploaded successfully!')
    except Exception as e:
        print(f"error to upload image: {e}")

while True:
    key = cv2.waitKey(1) & 0xFF
    if key == 27:
        break
    elif key == 112 or key == 80:
        uploadImgToCloud()
    ret, frame = cap.read()
    if ret:
        hold = cascade_hold.detectMultiScale(frame)
        if key == 115 or key == 83:
            hold = [[0, 0, 0, 0]]
        for (x, y, w, h) in hold:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.imshow('Webcam', frame)
        if len(hold) > 0:
            if not is_hold_detect:
                is_hold_detect = True
                filename = f"{img_folder}{lat}, {lon}.jpg"
                cv2.imwrite(filename, frame)
        else:
            is_hold_detect = False

cap.release()
cv2.destroyAllWindows()
