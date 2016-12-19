#!/bin/env python
# -*- coding: utf-8 -*-

import requests, json

message = "nvidi 960 graphics"


url = "http://search.beta.reverieinc.com/search"


headers = {
    'Content-Type': 'application/json',
}


data = {"text":[message],"domains":["retail"],"search_fields":["entity"],
        "ret_fields": ["entity","entity_type","meta"],"pivot_fields":["meta"],"accuracy":[95]}

response = requests.request("POST", url, headers=headers, json=data)
json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
new_json = json.loads(json_response)
#    return json_response
f_set = []  # list to return value to the template
for key, entities in new_json.items():  # initial json
    if key == 'entities':  # accessing data for entities key

        for item in entities:  # iterating list of 'entities' value
            item_list = []  # list to get item in entities key
            sub_dict = dict()  # to create dictionary of diff items
            item_list.append(item)
            for item in item_list:
                for key, value in item.items():
                    if key == "category":
                        for key, ivalue in value.items():
                            sub_dict[key] = ivalue
                    elif key == 'terms':
                        for item in value:
                            for keys, values in item.items():
                                if keys == 'token':
                                    # print values
                                    nkey = values
                                else:
                                    sub_dict[nkey] = values
                a = json.dumps(sub_dict)
                f_set.append(a)
print f_set
for i in f_set:
    print type(i)
