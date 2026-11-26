import os
from PIL import Image, ImageOps, ImageFilter

input_path = r"C:\Users\Hafiz Tayyab\.gemini\antigravity\brain\9f50955c-77e8-4169-a26e-6c27b48562b5\.user_uploaded\media_1795675140332_4047d63b.jpg"
print(f"Loading image from {input_path}")

img = Image.open(input_path).convert("RGBA")
width, height = img.size
print(f"Dimensions: {width}x{height}")

# Sample borders to find background color
samples = []
for x in [0, width // 2, width - 1]:
    samples.append(img.getpixel((x, 0)))
    samples.append(img.getpixel((x, height - 1)))
for y in [height // 4, height // 2, 3 * height // 4]:
    samples.append(img.getpixel((0, y)))
    samples.append(img.getpixel((width - 1, y)))

print("Border samples (RGBA):", samples[:5])
