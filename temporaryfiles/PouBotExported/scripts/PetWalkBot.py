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

def swipe_down():
    win32api.SetCursorPos((940,500))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    time.sleep(0.05)
    win32api.SetCursorPos((940,580))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)

def swipe_up():
    win32api.SetCursorPos((940,580))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    time.sleep(0.05)
    win32api.SetCursorPos((940,500))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)

def swipe_right():
    win32api.SetCursorPos((900,540))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    time.sleep(0.05)
    win32api.SetCursorPos((980,540))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)

time.sleep(3)

#color_ground = (66, 215, 255) pos 850, 705
#color_cloud = (255, 255, 255) pos 850, 705
#color_tree = (  0, 199,  24)  pos 850, 705
#color_sand = (255, 215,   0)  pos 940, 930

while keyboard.is_pressed('q') == False:
    time.sleep(0.2)
    if pyautogui.pixel(850, 705)[0] == 66 and pyautogui.pixel(850, 705)[1] == 215 and pyautogui.pixel(850, 705)[2] == 255:
        swipe_down()
    elif pyautogui.pixel(850, 705)[0] == 255 and pyautogui.pixel(850, 705)[1] == 255 and pyautogui.pixel(850, 705)[2] == 255:
        swipe_up()
    elif pyautogui.pixel(850, 705)[0] == 0 and pyautogui.pixel(850, 705)[1] == 199 and pyautogui.pixel(850, 705)[2] == 24:
        swipe_right()


