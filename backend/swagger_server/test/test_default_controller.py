# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_upload_csv(self):
        """Test case for upload_csv

        Upload a raw CSV file to the server.
        """
        body = Object()
        response = self.client.open(
            '/BRICHETT13/Gordian/1.0.0/import-csv-file',
            method='POST',
            data=json.dumps(body),
            content_type='application/octet-stream')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_upload_json(self):
        """Test case for upload_json

        Upload a raw JSON file to the server. JSONL format should also be supported
        """
        response = self.client.open(
            '/BRICHETT13/Gordian/1.0.0/import-json-file',
            method='POST',
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
