import numpy as np
import pandas as pd
import networkx as nx
import re
import json
import matplotlib.pyplot as plt

class DocumentOpener:

    def __init__(self, filepath):

        self.FILEPATH = filepath

        self.detect_filetype()


    def detect_filetype(self):
        
        self.file_ext = self.FILEPATH.split('.')[-1].lower()
        
        open_func = {
            'csv': self.read_csv,
            'xlsx': self.read_excel,
            'xls': self.read_excel,
            'json': self.read_json,
            'gephi': self.read_gephi,
            'gml': self.read_gml
        }
        
        self.df = open_func[self.file_ext]()
        
    def read_csv(self, sep = ","):
        return pd.read_csv(self.FILEPATH)
    
    def read_excel(self): 
        return pd.read_excel(self.FILEPATH)
    
    def read_json(self):
        with open(self.FILEPATH, 'r') as f: 
            d = f.read()
        
        return json.loads(d)
    
    def read_gephi(self):
        raise Exception("Gephi files are not yet supported.")

    def read_gml(self):

        reader = GMLReader(self.FILEPATH)
        reader.to_dataframe()

        self.NODELIST = reader.NODELIST
        self.EDGELIST = reader.EDGELIST


class GMLReader:
    
    def __init__(self, filepath):
        
        self.FILEPATH = filepath
        
        self.open_gml_file(self.FILEPATH)
        
    def open_gml_file(self, filepath) -> None:
        
#         Have a check that this filepath is a GML file

        with open(filepath) as f:
            self.data = f.read()
            
        self.elements = self.data.replace('\n', '').split(']')
        
    def to_dataframe(self):
        self.build_nodelist()
        self.build_edgelist()
        
    def build_nodelist(self):
        import pandas as pd
        self.NODELIST = pd.DataFrame([self.extract_node_data(i) for i in self.extract_node_raws()], columns=["id", "label"])
        
    def build_edgelist(self):
        import pandas as pd
        self.EDGELIST = pd.DataFrame([self.extract_edge_data(i) for i in self.extract_edge_raws()], columns=["source", "target", "value"])
        
    def extract_node_raws(self) ->  list[str]:
        
        return [element.strip() for element in self.elements if 'node' in element.lower()]
 
    def extract_edge_raws(self) -> list[str]:
        
        return [element.strip() for element in self.elements if 'edge' in element.lower()]
        
    def extract_value(self, pattern:str, s:str) -> str:
        import re

        s_clean = re.sub("""["']""", "", s)

        r = re.search(pattern, s)
        return r.group(1)

    def extract_node_data(self, s:str) -> tuple[str]:
        import re

        s_clean = re.sub("""["']""", "", s)

        id_ptn = "id\s+([A-Za-z0-9]{1,})"
        label_ptn = "label\s+([A-Za-z0-9]{1,})"

        return (self.extract_value(id_ptn, s_clean), self.extract_value(label_ptn, s_clean))

    def extract_edge_data(self, s:str) -> tuple[str]:
        import re

        source_ptn = "source\s+([A-Za-z0-9]{1,})\s+"
        target_ptn = "target\s+([A-Za-z0-9]{1,})\s+"
        val_ptn = "value\s+([A-Za-z0-9]{1,})?"

        return (self.extract_value(source_ptn, s), self.extract_value(target_ptn, s), self.extract_value(val_ptn, s))