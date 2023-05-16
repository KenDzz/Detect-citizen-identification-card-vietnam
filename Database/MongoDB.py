import pymongo
from bson.json_util import dumps
from bson import json_util
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["eKYC"]

def insertData(collection, data):
    mycol = mydb[collection]
    mycol.insert_one(data)


def getAllData(collection):
    mycol = mydb[collection]
    result = mycol.find()
    mydict = create_dict()
    i = 1
    for y in result:
        mydict.add(i, ({"text":y['text'], "crop": y['crop'], "imagetextorc": y['imagetextorc'],"imagetextcrop": y['imagetextcrop'], "imageupload": y['imageupload']}))
        i = i + 1

    stud_json = json.dumps(mydict,sort_keys=True)
    return stud_json


class create_dict(dict):

    # __init__ function
    def __init__(self):
        self = dict()

        # Function to add key:value

    def add(self, key, value):
        self[key] = value


