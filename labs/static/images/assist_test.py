#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json

message = "nvidi 960"


url = "http://search.beta.reverieinc.com/search" #""https://api-gw.revup.reverieinc.com/apiman-gateway/labs/localization/1.0"

querystring = {"target_lang": "hindi", "source_lang": "english", "domain": "3"}

headers = {
    'Content-Type': 'application/json',
}


data = {"text":[message],"domains":["retail"],"search_fields":["entity"],
        "ret_fields": ["entity","entity_type","meta"],"pivot_fields":["meta"],"accuracy":[95]}

response = requests.request("POST", url, headers=headers, json=data)
json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
new_json = json.loads(json_response)
#    return json_response
for key, entities in new_json.items():
    c = []
    if key == 'entities':

        for item in entities:
            a = []
            b = []

            b.append(item)
            for item in b:
                for key, value in item.items():
                    if key=="category":
                        for key, value in value.items():
                            print key, value
                            c.append(key)
                            c.append(value)
                    elif key=="terms":
                        for item in value:
                            for key, value in item.items():
                                a=[]
                                if isinstance(value, list):
                                    for i in value:
                                        a.append(i)
                                        #print i
                                else:
                                    print value,':'
                                    c.append(value)
                            print a
                            c.append(a)
                            print

    #print c,'\n'