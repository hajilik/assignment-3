import cv2
import numpy as np
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock
from math import ceil
from os import cpu_count
import time

lock = Lock()

# calculate average color: (R + G + B) / 3 for each square
def calculate_avg_color(image, start_row, start_col, square_size):
    square = image[start_row:start_row + square_size, start_col:start_col + square_size]
    avg_color = np.mean(square, axis=(0, 1), dtype=int)
    return tuple(avg_color)

# apply the average color to the corresponding square
def apply_avg_color(image, start_row, start_col, square_size, avg_color):
    image[start_row:start_row + square_size, start_col:start_col + square_size] = avg_color


# processing image in a single thread mode: From Left-to-Right and Top-to-Bottom simultaneously.
def process_image_single_thread(image, square_size, show_progress=False):
    rows, cols, _ = image.shape
    for i in range(0, rows, square_size):
        for j in range(0, cols, square_size):
            avg_color = calculate_avg_color(image, i, j, square_size)
            apply_avg_color(image, i, j, square_size, avg_color)
            if show_progress:
                cv2.imshow('Processing', image)
                cv2.waitKey(1)
                # I do not use time library here to sleep the process, because it is slow, and easy to visualize

# processing image in a multi thread mode: I divie the image into slices for each thread. 
# The number of regions (slices) equal to number of cores.
# I split the image vertically, and each thread is responsible to the region assigned to it.
# The width of the region equals to the width of the image divided by the number of cores. 
# For example, if the image width is 800 pixels and 16 cores in the machine
# each program thread will calculate average color and apply it in height x 50 regions
# from Left-to-Right and Top-to-Bottom simultaneously as single-thread.
def process_image_multi_thread(image, square_size, num_threads, show_progress=False):
    rows, cols, _ = image.shape
    region_width = ceil(cols / num_threads)  
    futures = []

    def process_region(start_col, end_col):
        for i in range(0, rows, square_size):
            for j in range(start_col, min(end_col, cols), square_size):
                avg_color = calculate_avg_color(image, i, j, square_size)
                apply_avg_color(image, i, j, square_size, avg_color)

    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        for t in range(num_threads):
            start_col = t * region_width
            end_col = start_col + region_width
            futures.append(executor.submit(process_region, start_col, end_col))

        # visualizing progress
        if show_progress:
            while any(future.running() for future in futures):
                with lock:
                    cv2.imshow('Processing', image)
                cv2.waitKey(1)
                time.sleep(2) # I use here sleep() function, because the process is too fast. 

        # wait for all threads to finish
        for future in as_completed(futures):
            future.result()

    # Final update
    if show_progress:
        with lock:
            cv2.imshow('Processing', image)
            cv2.waitKey(1)
            time.sleep(2)

def main():
    
    # user may enter less of more inputs. Needed to check it
    if len(sys.argv) != 4:
        print("Enter only 4 arguements: python processor.py file_name square_size mode")
        return

    file_name = sys.argv[1]
    try:
        square_size = int(sys.argv[2])
        if square_size <= 0:
            raise ValueError("Square size must be a positive INT.")
    except ValueError as e:
        print(f"Invalid square size: {e}")
        return

    mode = sys.argv[3].upper()
    if mode not in {'S', 'M'}:
        print("Invalid mode! Use 'S' for single-thread or 'M' for multi-thread.")
        return

    # loading the image
    image = cv2.imread(file_name)
    if image is None:
        print("Error: Either file not found or it is in invalid format.")
        return

    # processing the image
    num_threads = cpu_count()
    print(f"{num_threads} threads are available and using in multi-threaded processing.")

    if mode == 'S':
        print("Processing in single-thread mode ...")
        process_image_single_thread(image, square_size, show_progress=True)
    elif mode == 'M':
        print("Processing in multi-threaded mode ...")
        process_image_multi_thread(image, square_size, num_threads, show_progress=True)

    # image after processing
    cv2.imshow('Final Result', image)

    output_file_name = "test_images/result.jpg"
    cv2.imwrite(output_file_name, image)
    print(f"Processing completed. Saved as {output_file_name}.")

main()
