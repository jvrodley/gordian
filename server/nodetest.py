import json
import logging
import time
import traceback
import os


import document_processing as dp

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    logging.info("Starting sense-python")
    x = dp.DocumentGraphProcessing("./tweets.csv", 'handle', 'original_author')
    logging.info(x.EDGELIST)

