# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.data_import import DataImport  # noqa: E501
from swagger_server.test import BaseTestCase


class TestAdminsController(BaseTestCase):
    """AdminsController integration test stubs"""

    def test_upload_data(self):
        """Test case for upload_data

        Upload the data array for a submitted & validated file to the server after data import wizard flow is complete
        """
        body = DataImport()
        response = self.client.open(
            '/BRICHETT13/Gordian/1.0.0/import-data-mapping',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
