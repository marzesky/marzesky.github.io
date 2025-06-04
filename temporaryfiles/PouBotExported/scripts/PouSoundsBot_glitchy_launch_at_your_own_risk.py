from pyautogui import *
import pyautogui
import time
import keyboard
import random
import win32api, win32con

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,0,0)
    time.sleep(0.1) #This pauses the script for 0.1 seconds
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0)

def scan():
    if pyautogui.pixel(800, 495)[0] == 123:
        return(800, 495)
    elif pyautogui.pixel(1080, 495)[0] == 123:
        return(1080, 495)
    elif pyautogui.pixel(800, 765)[0] == 123:
        return(800, 765)
    elif pyautogui.pixel(1080, 765)[0] == 123:
        return(1080, 765)

def execute_sequence():
    for cords in sequence:
        click(cords[0],cords[1])
        time.sleep(0.15)

n = 1

while keyboard.is_pressed('q') == False:
    sequence = []
    while len(sequence) < n:
        next = scan()
        if next != None:
            sequence.append(next)
            time.sleep(0.4)
    n = n + 1
    time.sleep(1)
    print(sequence)
    execute_sequence()
    time.sleep(1)
