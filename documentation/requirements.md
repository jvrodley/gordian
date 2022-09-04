
For common or standardized data models in social network research (e.g. Twitter API’s data model), use a copy of those standards in our internal data models. However, allow flexible data mapping from source data to those standard target data models.
1. (Optional) User is shown a view with a list of different file format options - they are asked to select one option for the corresponding type of file they will be uploading
2. User is shown a view that asks them to submit a data file for upload, allows them to provide a given file (e.g. via File Explorer selection or drag-and-drop), and then uploads their file
3. User is shown a view that lists the column or attribute names automatically detected in their submitted file. The list contains columns for the detected datatype for each attribute, which are dropdowns with values that the user can change.
4. User is shown a view (same as #3, or a new different one?) that asks them to specify the key network node and edge properties in their uploaded file:
- - source node ID
- - target node ID
- - edge weight/value
- - edge type
- - whether the graph is directed or undirected.
- - For each property, a checkbox input is provided to specify whether the property is a list property. If so, user is prompted to specify the delimiter that should be used for parsing the values in the list.
5. For use cases where the data model chosen is related to a standardized data model (e.g. Twitter API), but the user’s uploaded file has a different set of names for its columns/attributes, the user is shown a view with a list or table of columns/attributes from the standardized data model. The list or table also contains the columns/attributes from the user’s uploaded file. The user is prompted to specify the mappings from their data to the target data model.
6. (Optional) User is shown a view with details of the configuration they’ve specified and asked to review it one last time before finishing.
7. The complete data from the input file is mapped and uploaded into the backend data storage mechanism.
8. User is shown a view confirming the success of the upload process and a link to view the resulting network.



...
???
...
11. Input is given to `document_processing.py` that specifies <`TEMP FILEPATH - SUGGEST CHANGING?`>, source column, and target column. Output:
    - Nodelist table
    - Edgelist table 
    - Network metrics table (e.g. centrality measures, betweenness scores)
    - A network graph data structure
12. ????
13. ????
14. User chooses command to export the processed network data. For each output from #11, the user can select to export to one of the following file formats:
    - CSV
    - Excel
    - JSON
    - (JSONL?)
    - .gephi
    - .gml
    Output: a file of the processed data in the specified filetype. 