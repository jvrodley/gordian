# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.data_import_data import DataImportData  # noqa: F401,E501
from swagger_server import util


class DataImport(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, name: str=None, data: List[DataImportData]=None):  # noqa: E501
        """DataImport - a model defined in Swagger

        :param name: The name of this DataImport.  # noqa: E501
        :type name: str
        :param data: The data of this DataImport.  # noqa: E501
        :type data: List[DataImportData]
        """
        self.swagger_types = {
            'name': str,
            'data': List[DataImportData]
        }

        self.attribute_map = {
            'name': 'name',
            'data': 'data'
        }
        self._name = name
        self._data = data

    @classmethod
    def from_dict(cls, dikt) -> 'DataImport':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The DataImport of this DataImport.  # noqa: E501
        :rtype: DataImport
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self) -> str:
        """Gets the name of this DataImport.


        :return: The name of this DataImport.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name: str):
        """Sets the name of this DataImport.


        :param name: The name of this DataImport.
        :type name: str
        """
        if name is None:
            raise ValueError("Invalid value for `name`, must not be `None`")  # noqa: E501

        self._name = name

    @property
    def data(self) -> List[DataImportData]:
        """Gets the data of this DataImport.


        :return: The data of this DataImport.
        :rtype: List[DataImportData]
        """
        return self._data

    @data.setter
    def data(self, data: List[DataImportData]):
        """Sets the data of this DataImport.


        :param data: The data of this DataImport.
        :type data: List[DataImportData]
        """
        if data is None:
            raise ValueError("Invalid value for `data`, must not be `None`")  # noqa: E501

        self._data = data
