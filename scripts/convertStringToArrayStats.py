from pymongo import MongoClient
import pandas as pd

client = MongoClient('mongodb+srv://pigregistration:ofBhdtQEb5Dx9AKl@cluster0.p2vsne5.mongodb.net/?retryWrites=true&w=majority')

db = client.pigregistration2022