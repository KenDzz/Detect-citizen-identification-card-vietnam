import shutil as st
import random as rd
import uuid

import uvicorn
from fastapi import FastAPI, File, UploadFile, Request
from typing import List
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from Dectect.corners import crop_image
from OCR.ocrtext import OCR_text

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/data", StaticFiles(directory="data"), name="data")
domain = ' http://127.0.0.1:8000/'



@app.get("/", include_in_schema=False)
async def index():
    return RedirectResponse(url="/redoc")

@app.post("/eKYC/")
async def upload_file_eKYC(files: List[UploadFile] = File(...)):
    for file in files:
        file_name_rd = uuid.uuid4().hex + str(rd.randint(100000, 10000000)) + ".jpg"
        with open("data/upload/"+file_name_rd, "wb") as buffer:
            st.copyfileobj(file.file, buffer)
        crop_image(file_name_rd)
        text_OCR, img_text_OCR = OCR_text(file_name_rd,domain)


    return {"text":text_OCR, "imagecrop": domain+"data/crop/"+file_name_rd, "imagetextorc": domain+"data/ORCText/" + file_name_rd,"imagetextcrop": img_text_OCR, "imageupload": domain+"data/upload/"+file_name_rd}

if __name__ == "__main__":
    uvicorn.run(app, debug=True)