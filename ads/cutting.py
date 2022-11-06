import cv2
import numpy as np

img_name = "image.jpeg"

def cropImages():
    img = cv2.imread(img_name)
    print(img.shape) # Print image shape
    cv2.imshow("original", img)
    
    # Cropping an image
    cropped_image1 = img[0:512, 0:512]
    cropped_image2 = img[512:1024, 0:512]
    cropped_image3 = img[0:512, 512:1024]
    cropped_image4 = img[512:1024, 512:1024]
    
    # Display cropped image
    cv2.imshow("cropped", cropped_image1)
    
    # Save the cropped image
    cv2.imwrite(f"{img_name}1.jpg", cropped_image1)
    cv2.imwrite(f"{img_name}2.jpg", cropped_image2)
    cv2.imwrite(f"{img_name}3.jpg", cropped_image3)
    cv2.imwrite(f"{img_name}4.jpg", cropped_image4)
    