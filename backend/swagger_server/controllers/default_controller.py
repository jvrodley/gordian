import connexion
import six

from swagger_server import util


def upload_csv(body=None):  # noqa: E501
    """Upload a raw CSV file to the server.

     # noqa: E501

    :param body: 
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Object.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def upload_json():  # noqa: E501
    """Upload a raw JSON file to the server. JSONL format should also be supported

     # noqa: E501


    :rtype: None
    """
    return 'do some magic!'

def upload_data(body=None):  # noqa: E501
    """Upload the data array for a submitted &amp; validated file to the server after data import wizard flow is complete

    Adds an array of data (e.g. the Data&lt;T&gt; type within react-spreadsheet-import) to the system # noqa: E501

    :param body: Inventory item to add
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = DataImport.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
