#!/bin/env python
# -*- coding: utf-8 -*-

import requests, json


message = "samsung mobile phone"

#    "nvidi 960"

url = "http://search.beta.reverieinc.com/search"

headers = {
    'Content-Type': 'application/json',
}

data = {"text": [message], "domains": ["retail"], "search_fields": ["entity"],
        "ret_fields": ["entity", "entity_type", "meta"], "pivot_fields": ["meta"], "accuracy": [95]}

response = requests.request("POST", url, headers=headers, json=data)
json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
new_json = json.loads(json_response)
#    return json_response
f_set = []  # list to return value to the template
ddict = dict()
for key, entities in new_json.items():  # initial json
    if key == 'entities':  # accessing data for entities key

        for i, item in enumerate(entities):  # iterating list of 'entities' value
            item_list = []  # list to get item in entities key
            sub_dict = dict()  # to create dictionary of diff items
            item_list.append(item)

            for item in item_list:  # iterating items from list
                for key, value in item.items():  # iterating dictionary from items of list.
                    if key == "category":  # searching for key 'category'
                        for key, ivalue in value.items():  # appending 'category' details
                            sub_dict[key] = ivalue
                            sub_dict={'one':sub_dict}
                    elif key == 'terms':  # appending 'terms' details
                        for item in value:
                            for keys, values in item.items():
                                if keys == 'token':
                                    # print values
                                    keyword = values
                                else:
                                    sub_dict[keyword] = json.dumps(values)
                                    # sub_dict='{',sub_dict,'}'
                f_set.append((sub_dict))  # appending dictinaries to 'f_set' list

                #print 'sub',sub_dict
                #print type(sub_dict)
                #print json.dumps((sub_dict), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
                a = (sub_dict)#, ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
                ddict[i] = a
fj = json.dumps(f_set, ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
print fj

for i in json.loads(fj):
    for k, v in i.items():
        if k == 'one':
            for q, w in v.items():
                print 'qwerty', q, w
        else:
            print k, v
    print
