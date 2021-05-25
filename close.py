from time import sleep
from gpiozero import Button
import RPi.GPIO as IO

IO.setwarnings(False)

IO.setmode(IO.BCM)

IO.setup(18,IO.OUT)

left = IO.PWM(18,100)

button = Button(16)

left.start(0)
left.ChangeDutyCycle(100)

while True:
    if(button.is_pressed):
        print("Pressed")
        left.stop()
        break
    sleep(1)
