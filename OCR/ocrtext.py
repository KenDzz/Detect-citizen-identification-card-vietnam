import os
import easyocr
import uuid
import cv2 as cv
import random as rd

from detecto import core, utils, visualize
from matplotlib import pyplot as plt
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
from PIL import Image

def OCR_text(file_name_rd, domain):
    # VietORC
    config = Cfg.load_config_from_name('vgg_transformer')
    config['weights'] = 'data/training/transformerocr.pth'
    config['cnn']['pretrained'] = False
    config['device'] = 'cpu'
    config['predictor']['beamsearch'] = False
    detector = Predictor(config)

    img = utils.read_image("data/crop/" + file_name_rd)
    reader = easyocr.Reader(['vi'], gpu=False)
    result = reader.readtext(img)
    dir_crop_text = "data/crop_text/" + file_name_rd[:-4]
    os.mkdir(dir_crop_text)
    text_OCR = []
    img_text_OCR = []
    for (bbox, text, prob) in result:
        (tl, tr, br, bl) = bbox
        tl = (int(tl[0]), int(tl[1]))
        tr = (int(tr[0]), int(tr[1]))
        br = (int(br[0]), int(br[1]))
        bl = (int(bl[0]), int(bl[1]))

        min_x = min(tl[0], tr[0], br[0], bl[0])
        max_x = max(tl[0], tr[0], br[0], bl[0])
        min_y = min(tl[1], tr[1], br[1], bl[1])
        max_y = max(tl[1], tr[1], br[1], bl[1])

        # Crop Text
        s = detector.predict(Image.fromarray(img[min_y:max_y, min_x:max_x]))
        # file_name_rd[:-4] => delete .jpg
        file_name_rd_ORC_crop = dir_crop_text + "/" + uuid.uuid4().hex + str(rd.randint(100000, 10000000)) + ".jpg"
        Image.fromarray(img[min_y:max_y, min_x:max_x]).save(file_name_rd_ORC_crop)
        text_OCR.append(s)
        img_text_OCR.append(domain + file_name_rd_ORC_crop)
        cv.rectangle(img, tl, br, (0, 255, 0), 2)

    # show img orc text
    # print(text_ORC)
    # plt.figure(figsize=(16, 16))
    # plt.imshow(img)
    cv.imwrite("data/ORCText/" + file_name_rd, img[:, :, ::-1])
    plt.show()
    return text_OCR, img_text_OCR