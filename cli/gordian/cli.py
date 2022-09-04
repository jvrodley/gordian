"""
The command-line interface for the document processing engine
"""
import argparse
from modules.document_processing import DocumentGraphProcessing


def main():
    parser = argparse.ArgumentParser(
        description="An over-simplified downloader to demonstrate python packaging."
    )
    parser.add_argument(
        "filepath", type=str,
        help="The path to the input file."
    )
    parser.add_argument(
        "--source, -s", 
        help=("Source column containing the node IDs for the source nodes in directed relationships.")
    )
    parser.add_argument(
        "--target", "-t",
        help=("Target column containing node IDs for target nodes in directed relationships.")
    )
    args = parser.parse_args()
    file_size = DocumentGraphProcessing(args.filepath, source=args.source, sink=args.target)
    print("Download successful! (size: {} B)".format(file_size))

if __name__ == "__main__":
    main()