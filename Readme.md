# Image Processing: Single and Multi-thread Pixelation

This program pixelates images by averaging the colors (RGB) of square blocks. You can run it in either **single-thread** or **multi-thread** mode depending on how fast you want it to process the image.

## Features
- **Single-threaded Mode**: Works one block at a time (slower).
- **Multi-threaded Mode**: Uses multiple CPU cores to speed up the process.
- **Custom Block Size**: You can set the size of the blocks that get pixelated.
- **Progress Visualization**: Shows you how the image is being processed in real-time.


## Logic Behind Single and Multi-threaded Processing
1. Single-threaded Processing:
- The image is processed from left-to-right and top-to-bottom.
- Each block is processed one at a time by calculating its average color and applying it to the respective block.
- This approach is straightforward but slower because it does not leverage multiple CPU cores.

2. Multi-threaded Processing:
- The image is vertically divided into slices, with each slice assigned to a thread.
- The number of slices is determined by the number of available CPU cores.
- For example, if the image width is 800 pixels and the machine has 16 cores, each thread processes a vertical region of [height x 50] pixels.
- Within each slice, blocks are processed from left-to-right and top-to-bottom, similar to single-threaded processing, but concurrently across multiple threads.
- This method significantly speeds up processing, especially for large images.


## Installation
1. Download and install **Python 3.6 or higher** from (https://www.python.org/downloads/).
2. Install the required libraries:
   pip install opencv-python-headless numpy
   *OR*
   pip install -r requirements.txt


## Usage
To run the program, 
- prepare the image you want to process
- open the terminal or command prompt and navigate to the folder containing the script.
- run the program with the following syntax:
- python script_name.py <image_path> <square_size> <mode> 
- Here, <image_path>: Path to the image file you want to process, <square_size>: The size of each square block for pixelation (e.g., 10, 20, 30), <mode>: Choose either 'S' for single-threaded or 'M' for multi-threaded processing.
- Example: python processor.py azerbaijan-flag.jpg 20 S 
- This means the image at azerbaijan-flag.jpg will be processed with a block size of 20 in single-threaded mode. The result.jpg image will be saved in ./test_images folder.
