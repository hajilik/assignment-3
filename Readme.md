# Image Processing: Single and Multi-thread Pixelation

This program pixelates images by averaging the colors (RGB) of square blocks. You can run it in either **single-thread** or **multi-thread** mode depending on how fast you want it to process the image.

## Features
- **Single-threaded Mode**: Works one block at a time (slower).
- **Multi-threaded Mode**: Uses multiple CPU cores to speed up the process.
- **Custom Block Size**: You can set the size of the blocks that get pixelated.
- **Progress Visualization**: Shows you how the image is being processed in real-time.



## Installation
1. Download and install **Python 3.6 or higher** from (https://www.python.org/downloads/).
2. Install the required libraries:
   pip install opencv-python-headless numpy

**OR**

If you use Windows, there is a shortcut: activate virtual environment, 'venv', with the following syntax:
- venv\Scripts\activate



## Usage
To run the program, 
- prepare the image you want to process
- open the terminal or command prompt and navigate to the folder containing the script.
- run the program with the following syntax:
- python script_name.py <image_path> <square_size> <mode> 
- Here, <image_path>: Path to the image file you want to process, <square_size>: The size of each square block for pixelation (e.g., 10, 20, 30), <mode>: Choose either 'S' for single-threaded or 'M' for multi-threaded processing.
- Example: python processor.py ./test_images/azerbaijan-flag.jpg 20 S 
This means the image at ./test_images/azerbaijan-flag.jpg will be processed with a block size of 20 in single-threaded mode. The result.jpg image will be saved in ./test_images folder.