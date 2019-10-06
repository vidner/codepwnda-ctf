# mau buang border braillenya
import cv2
import numpy as np

img = cv2.imread('good_one_mate.png', 0)
cnv = np.zeros(img.shape, np.uint8)
row, col = img.shape

for i in range(row):
	for j in range(col):
		if img[i, j] == 0:
			cnv[i, j] = 0
		else:
			cnv[i, j] = 255

cv2.imwrite('braille.png', cnv)
# cv2.imshow('cnv', cnv)
# cv2.waitKey(0)
# cv2.DestroyAllWindows()
