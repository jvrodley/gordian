class DocumentGraphProcessing:
    
    def __init__(self, filepath, source = None, sink = None):
        
        self.FILEPATH = filepath
        self.source = source
        self.sink = sink
    
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
        with open(fp, 'r') as f: 
            d = f.read()
        
        return json.loads(d)
    
    def read_gephi(self):
        pass
    
    def read_gml(self):
        self.g = nx.read_gml(fp)
        
        self.EDGELIST = pd.DataFrame([tuple(i.replace(" {'value':", ",").replace('}', '').split(',')) for i in nx.generate_edgelist(p.g)], columns = ['source' ,'sink'])
    
    def build_graph(self): 
        g = nx.Graph()

        [g.add_node(n) for n in all_nodes]
        [g.add_edge(i[0], i[1]) for i in list(zip(source, sink))]
    
        return None
    
    def write_csv(self, sep = ","):
        pass
    
    def write_excel(self): 
        pass
    
    def to_json(self):
        import json
        
        return json.load(self.FILEPATH)
    
    def write_gephi(self):
        pass 
    
    def draw(self): 
        
        nx.draw_kamada_kawai(p.g)
    