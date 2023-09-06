import numpy as np
import pandas as pd
import networkx as nx
import re
import json
import matplotlib.pyplot as plt


class DataFrameGraphProcessing:
    
    def __init__(self, data, source = None, sink = None, label = None, min_deg = None, max_deg = None):
        
        self.data = data
        self.source_col = source
        self.sink_col = sink
        self.label = label
        self.min_deg = min_deg
        self.max_deg = max_deg
        

    def df_to_edgelist(self): 
        # Add line to convert '' to na for dropping
        filter_mask = [i for i in [self.source_col, self.sink_col, self.label] if i is not None]

        df_sub = self.data.dropna(subset = [self.source_col, self.sink_col])

        df_filt = df_sub[filter_mask].copy()

        import pandas as pd
        self.NODELIST = pd.DataFrame(list(set(df_filt[self.source_col]) | set(df_filt[self.sink_col])))
        self.NODELIST.reset_index(inplace=True, drop=False)
        self.NODELIST.columns = ["id", "label"]

        id_map = dict(zip(self.NODELIST.label, self.NODELIST.id))

        self.EDGELIST = df_filt.copy()
        self.EDGELIST[self.source_col] = self.EDGELIST[self.source_col].map(id_map)
        self.EDGELIST[self.sink_col] = self.EDGELIST[self.sink_col].map(id_map)

    def build_graph(self): 
        self.g = nx.Graph()

        [self.g.add_node(n) for n in self.NODELIST.id]
        [self.g.add_edge(i[0], i[1])  for i in list(zip(self.EDGELIST[self.source_col].tolist(), self.EDGELIST[self.sink_col].tolist()))]

        self.n_nodes = len(self.g.nodes)
    
        return None
    
    def write_csv(self, filename, sep = ","):
        self.EDGELIST.to_csv(f'./{filename}_el.csv', index=None, sep = sep)
        self.NODELIST.to_csv(f'./{filename}_nl.csv', index=None, sep = sep)
    
    def write_excel(self, filename): 
        self.EDGELIST.to_excel(f'./{filename}_el.csv', index=None)
        self.NODELIST.to_excel(f'./{filename}_nl.csv', index=None)
    
    def to_json(self):
        import json
        
        return json.load(self.FILEPATH)
    
    def write_gephi(self):
        pass 

    def write_gml(self): 
        pass
    
    def calculate_centrality(self):
        deg = nx.degree_centrality(self.g)
        closeness = nx.closeness_centrality(self.g)
        betweenness = nx.betweenness_centrality(self.g)
        eigen = nx.eigenvector_centrality(self.g)
        cen = pd.DataFrame([deg, closeness, betweenness, eigen]).transpose()
        cen.columns = ['degree', 'closeness', 'betweenness', 'eigenvector']
        cen['degree_nonnormal'] = cen.degree.apply(lambda x: int(round(x * self.n_nodes)))
        
        self.centrality = cen

    def filter_graph_degree(self): 

        if (self.min_deg is None) and (self.max_deg is None):
            df = self.centrality.reset_index(drop=False)
        elif (self.min_deg is not None) and (self.max_deg is None):
            df = self.centrality.loc[self.centrality.degree_nonnormal > self.min_deg].reset_index(drop=False)
        elif (self.min_deg is None) and (self.max_deg is not None):
            df = self.centrality.loc[self.centrality.degree_nonnormal < self.max_deg].reset_index(drop=False)
        elif (self.min_deg is not None) and (self.max_deg is not None):
            df = self.centrality.loc[(self.centrality.degree_nonnormal > self.min_deg) & (self.centrality.degree_nonnormal < self.max_deg)].reset_index(drop=False)
        else:
            # Put in proper error handling here
            print("Input not recognized")
        
        
        df.columns = ['node_name'] + list(df.columns)[1:]
        self.sub_g = nx.induced_subgraph(self.g, df.node_name)
    
    def draw(self, scope = 'full'):  
        
        if scope == 'full': 
            g = self.g
        elif scope == 'subgraph':
            self.filter_graph_degree()
            g = self.sub_g
        else: 
            pass

        import matplotlib.pyplot as plt
        # larger figure size
        plt.figure(3,figsize=(12,12)) 
        nx.draw_kamada_kawai(g)
    
    def save_graph(self, filename, scope = 'full'):

        self.draw(scope = scope)
        plt.savefig(f'./export/{filename}.png')