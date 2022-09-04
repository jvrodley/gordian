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
        "--s", 
        help=("Source column containing the node IDs for the source nodes in directed relationships.")
    )
    parser.add_argument(
        "--t",
        help=("Target column containing node IDs for target nodes in directed relationships.")
    )
    
    parser.add_argument(
        "--of",
        help=("The output format to save the output files in.")
    )

    parser.add_argument(
        "--min_deg",
        type = int,
        help=("The output format to save the output files in.")
    )

    parser.add_argument(
        "--max_deg",
        type = int,
        help=("The output format to save the output files in.")
    )

    # parser.add_argument(
    #     "--g",
    #     help=("Specifies whether a graph be saved")
    # )

    args = parser.parse_args()

    file_ext = args.filepath.split('.')[-1]

    min_deg = args.min_deg
    max_deg = args.max_deg

    print(min_deg, max_deg)

    if file_ext.lower() not in ['gml', 'gephi']:
        dgp = DocumentGraphProcessing(args.filepath, source=args.s, sink=args.t, min_deg = min_deg, max_deg = max_deg)
        print(dgp.n_nodes)
    else: 
        dgp = DocumentGraphProcessing(args.filepath)
        print(dgp.n_nodes)

    save_func = {
            'csv': dgp.write_csv,
            'xlsx': dgp.write_excel,
            'xls': dgp.write_excel,
            'json': dgp.to_json,
            'gephi': dgp.write_gephi,
            'gml': dgp.write_gml
        }

    save_func[args.of.lower()](f'./export/testing.{args.of.lower()}')

    if (min_deg is not None) and (max_deg is not None):

        dgp.save_graph('graph_test', scope='subgraph')

    else: 
        dgp.save_graph('graph_test', scope='subgraph')

if __name__ == "__main__":
    main()