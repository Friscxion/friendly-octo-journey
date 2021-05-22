from time import sleep
from gpiozero import Button
import RPi.GPIO as IO

IO.setwarnings(False)

IO.setmode(IO.BCM)

IO.setup(14,IO.OUT)

right = IO.PWM(14,100)

button = Button(21)

right.start(0)
right.ChangeDutyCycle(100)

while True:
    if button.is_pressed:
        print("Pressed")
        right.stop()
        break;

