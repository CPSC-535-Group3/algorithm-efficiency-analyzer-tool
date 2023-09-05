import os, uuid, json, time, random, logging, math, os, base64
from flask import request, make_response, jsonify
from datetime import datetime, timedelta


class CKey:
    GET = "GET"
    POST = "POST"
    DELETE = "DELETE"
    PUT = "PUT"
    PATCH = "PATCH"
    COUNT = "COUNT"