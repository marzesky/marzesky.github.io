from pyautogui import *
import pyautogui
import time
import keyboard
import random
import win32api, win32con

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    time.sleep(0.05) #This pauses the script for 0.05 seconds
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)

time.sleep(3)
xshift = 0

while keyboard.is_pressed('q') == False:
    time.sleep(0.35)
    if pyautogui.pixel(1120+xshift, 540)[0] != 255 and pyautogui.pixel(1120+xshift, 540)[0] != 123:
        click(1600, 500)
        xshift += 180
        print(xshift)
    else:
        click(400, 500)
        xshift -= 180
        print(xshift)

