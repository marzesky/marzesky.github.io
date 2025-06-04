from pyautogui import *
import pyautogui
import time
import keyboard
import random
import win32api, win32con

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    time.sleep(0.1)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)

time.sleep(3)
#color_coin = (255, 231,   0)
#color_water = ( 66, 215, 255)
#color_clock = ( 255, 255, 255)
#color_platform = (255, 255,   0)

while keyboard.is_pressed('q') == False:
    time.sleep(0.20)
    #if pyautogui.pixel(740, 775)[0] == 255:
        #click(400, 500)
    if pyautogui.pixel(1075, 900)[0] == 255:
        click(1600, 500)
    else:
        click(400, 500)

