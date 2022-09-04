import json
import logging
import time
import traceback
import os
import document_processing

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    logging.info("Starting sense-python")
    dp = document_processing.DocumentGraphProcessing("./tweets.csv")

