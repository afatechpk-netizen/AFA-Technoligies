import math
from PIL import Image, ImageFilter

input_path = r"C:\Users\Hafiz Tayyab\.gemini\antigravity\brain\9f50955c-77e8-4169-a26e-6c27b48562b5\.user_uploaded\media_1795675140332_4047d63b.jpg"
img = Image.open(input_path).convert("RGB")
width, height = img.size

# Background reference color
bg_r, bg_g, bg_b = 247, 247, 247

def get_dist(r, g, b):
    return math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)

# Step 1: Identify all pixels that are very close to bg
# Threshold for being candidate background: dist < 22
is_candidate_bg = [[False] * width for _ in range(height)]
for y in range(height):
    for x in range(width):
        r, g, b = img.getpixel((x, y))
        if get_dist(r, g, b) < 22:
            is_candidate_bg[y][x] = True

# Step 2: Flood-fill outer background from borders
is_bg_mask = [[False] * width for _ in range(height)]
queue = []
for x in range(width):
    if is_candidate_bg[0][x]:
        queue.append((x, 0))
        is_bg_mask[0][x] = True
    if is_candidate_bg[height - 1][x]:
        queue.append((x, height - 1))
        is_bg_mask[height - 1][x] = True
for y in range(height):
    if is_candidate_bg[y][0] and not is_bg_mask[y][0]:
        queue.append((0, y))
        is_bg_mask[y][0] = True
    if is_candidate_bg[y][width - 1] and not is_bg_mask[y][width - 1]:
        queue.append((width - 1, y))
        is_bg_mask[y][width - 1] = True

head = 0
while head < len(queue):
    cx, cy = queue[head]
    head += 1
    for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
        if 0 <= nx < width and 0 <= ny < height and not is_bg_mask[ny][nx] and is_candidate_bg[ny][nx]:
            is_bg_mask[ny][nx] = True
            queue.append((nx, ny))

print(f"Outer bg pixels: {len(queue)}")

# Step 3: Find enclosed background regions (counters of A, O, circuit rings, etc.)
# Component #6 (center around (448, 158)) is the solid white dot on the blue surface, keep it FOREGROUND!
comp_visited = [[False] * width for _ in range(height)]
for y in range(height):
    for x in range(width):
        if is_candidate_bg[y][x] and not is_bg_mask[y][x] and not comp_visited[y][x]:
            c_pixels = [(x, y)]
            comp_visited[y][x] = True
            c_head = 0
            while c_head < len(c_pixels):
                px, py = c_pixels[c_head]
                c_head += 1
                for nx, ny in [(px+1, py), (px-1, py), (px, py+1), (px, py-1)]:
                    if 0 <= nx < width and 0 <= ny < height and is_candidate_bg[ny][nx] and not is_bg_mask[ny][nx] and not comp_visited[ny][nx]:
                        comp_visited[ny][nx] = True
                        c_pixels.append((nx, ny))
            
            # Check if this component is the white dot at (448, 158)
            avg_x = sum(p[0] for p in c_pixels) / len(c_pixels)
            avg_y = sum(p[1] for p in c_pixels) / len(c_pixels)
            if 435 <= avg_x <= 465 and 145 <= avg_y <= 175:
                print(f"Preserving solid white dot component at ({avg_x:.1f}, {avg_y:.1f}), size={len(c_pixels)}")
            else:
                # Mark as background
                for px, py in c_pixels:
                    is_bg_mask[py][px] = True

# Step 4: Refine edge pixels and compute smooth alpha + defringe
# For every pixel, calculate alpha based on distance and distance to background mask
out_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))

# Distance transform / smooth transition:
# Low threshold: dist <= 12 -> alpha = 0
# High threshold: dist >= 38 -> alpha = 255
# For 12 < dist < 38, alpha is smoothly interpolated
for y in range(height):
    for x in range(width):
        r, g, b = img.getpixel((x, y))
        d = get_dist(r, g, b)
        
        if is_bg_mask[y][x]:
            # Pure background
            out_img.putpixel((x, y), (0, 0, 0, 0))
        else:
            if d >= 38:
                # Pure foreground
                out_img.putpixel((x, y), (r, g, b, 255))
            elif d <= 8:
                # Virtually background
                out_img.putpixel((x, y), (0, 0, 0, 0))
            else:
                # Anti-aliased transition pixel
                # Smoothstep alpha
                t = (d - 8.0) / (38.0 - 8.0)
                alpha = t * t * (3.0 - 2.0 * t)  # smoothstep [0, 1]
                a_int = int(round(alpha * 255))
                
                if a_int <= 0:
                    out_img.putpixel((x, y), (0, 0, 0, 0))
                else:
                    # Defringe / Un-premultiply: remove the contribution of the background color (247, 247, 247)
                    # c = alpha * fg + (1 - alpha) * bg  =>  fg = (c - (1 - alpha) * bg) / alpha
                    inv_alpha = 1.0 - alpha
                    clean_r = max(0, min(255, int(round((r - inv_alpha * bg_r) / alpha))))
                    clean_g = max(0, min(255, int(round((g - inv_alpha * bg_g) / alpha))))
                    clean_b = max(0, min(255, int(round((b - inv_alpha * bg_b) / alpha))))
                    out_img.putpixel((x, y), (clean_r, clean_g, clean_b, a_int))

# Crop transparent borders (autocrop)
bbox = out_img.getbbox()
print(f"Autocrop bbox: {bbox}")
cropped = out_img.crop(bbox)

# Add comfortable 4% padding around the logo so it renders beautifully in all containers
pad = int(max(cropped.width, cropped.height) * 0.04)
final_logo = Image.new("RGBA", (cropped.width + 2*pad, cropped.height + 2*pad), (0, 0, 0, 0))
final_logo.paste(cropped, (pad, pad))

# Save master PNG
final_logo.save("scripts/logo_transparent.png", "PNG")
print(f"Saved scripts/logo_transparent.png with size {final_logo.size}")

# Render previews on dark and light backgrounds
dark_bg = Image.new("RGB", final_logo.size, (8, 12, 20)) # #080c14 site theme
dark_bg.paste(final_logo, (0, 0), final_logo)
dark_bg.save("scripts/preview_dark.png")

light_bg = Image.new("RGB", final_logo.size, (255, 255, 255))
light_bg.paste(final_logo, (0, 0), final_logo)
light_bg.save("scripts/preview_light.png")

print("Generated previews successfully!")
