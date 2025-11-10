import os
from PIL import Image

def resize_images_in_folder(folder_path, target_width, output_folder=None):

    # Check if input folder exists
    if not os.path.isdir(folder_path):
        print(f"Error: The folder '{folder_path}' does not exist.")
        return

    # If no output folder provided, overwrite in same folder
    if output_folder is None:
        output_folder = folder_path
    else:
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # Skip non-image files
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp')):
            continue

        try:
            img = Image.open(file_path)
            w, h = img.size

            # maintain aspect ratio
            new_height = int((target_width / w) * h)

            resized_img = img.resize((target_width, new_height), Image.LANCZOS)

            save_path = os.path.join(output_folder, filename)
            resized_img.save(save_path)

            print(f"Resized: {filename} -> {target_width}x{new_height}")

        except Exception as e:
            print(f"Skipping {filename} (Error: {e})")


if __name__ == "__main__":
    folder = input("Enter folder path: ").strip()
    width = int(input("Enter new width: ").strip())
    output = input("Output folder (leave blank to overwrite): ").strip()
    output = output if output else None

    resize_images_in_folder(folder, width, output)