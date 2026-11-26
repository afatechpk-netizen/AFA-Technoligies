import os
from PIL import Image

# Load the cleanly processed transparent logo
master = Image.open("scripts/logo_transparent.png")
print("Master logo dimensions:", master.size)

public_img_dir = "public/images"
os.makedirs(public_img_dir, exist_ok=True)

# 1. Save main logo.png (high-res transparent PNG)
master.save(os.path.join(public_img_dir, "logo.png"), "PNG", optimize=True)

# 2. Save main logo.webp (high-res lossless WebP)
master.save(os.path.join(public_img_dir, "logo.webp"), "WEBP", lossless=True, quality=100)

# 3. Save logo-icon.webp
master.save(os.path.join(public_img_dir, "logo-icon.webp"), "WEBP", lossless=True, quality=100)

# 4. Save logo-footer.webp
master.save(os.path.join(public_img_dir, "logo-footer.webp"), "WEBP", lossless=True, quality=100)

# 5. Save logo-stacked.webp
master.save(os.path.join(public_img_dir, "logo-stacked.webp"), "WEBP", lossless=True, quality=100)

# 6. Save logo.jpg on clean white background
white_bg = Image.new("RGB", master.size, (255, 255, 255))
white_bg.paste(master, (0, 0), master)
white_bg.save(os.path.join(public_img_dir, "logo.jpg"), "JPEG", quality=95)

# 7. Generate favicon.ico and app/favicon.ico
# For favicon, we can create multi-resolution ico (16x16, 32x32, 48x48, 64x64)
# Make square canvas for favicon
square_size = max(master.width, master.height)
fav_canvas = Image.new("RGBA", (square_size, square_size), (0, 0, 0, 0))
offset_x = (square_size - master.width) // 2
offset_y = (square_size - master.height) // 2
fav_canvas.paste(master, (offset_x, offset_y), master)

fav_canvas.save("public/favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64)])
fav_canvas.save("app/favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64)])

# Also create app/icon.png (Next.js automatically recognizes this for metadata)
fav_canvas.resize((512, 512), Image.Resampling.LANCZOS).save("app/icon.png", "PNG")

print("All logo and favicon assets updated successfully!")
