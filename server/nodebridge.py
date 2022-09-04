import json
import logging
import time
import traceback
import os
import sys

import document_processing as dp

if __name__ == "__main__":
    print(dp.DocumentGraphProcessing(sys.argv[1], 'handle', 'original_author').EDGELIST.to_dict(orient='record'))

