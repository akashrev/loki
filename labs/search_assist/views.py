#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json


#######################################################################################################################
# Create your views here.
def assist_api(message):

    url = "http://search.beta.reverieinc.com/search"

    headers = {
        'Content-Type': 'application/json',
    }

    data = {"text": [message], "domains": ["retail"], "search_fields": ["entity"],
            "ret_fields": ["entity", "entity_type", "meta"], "pivot_fields": ["meta"], "accuracy": [95]}

    response = requests.request("POST", url, headers=headers, json=data)
    # raw json to render in templates in beautifier form
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    #    return json_response
    new_json = json.loads(json_response)
    f_set = []                                      # list to return values to the template
    for key, entities in new_json.items():          # initial json
        if key == 'entities':                       # accessing data for entities key

            for item in entities:                   # iterating list of 'entities'\'s value
                item_list = []                      # list to get item in 'entities' key
                sub_dict = dict()                   # to create dictionary of diff. items
                item_list.append(item)

                for item in item_list:                          # iterating items from list
                    for key, value in item.items():             # iterating dictionary from items of list.
                        if key == "category":                   # searching for key 'category'
                            for key, ivalue in value.items():  # appending 'category' details
                                sub_dict[key] = ivalue
                                sub_dict = {'1': sub_dict}
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

    return f_set, json_response


#######################################
# function for search assist on labs

def search_assist(request):
    if request.GET.get('submit'):
        message = request.GET.get('search')

        engine_result, engine_json = assist_api(message)

        output = engine_result
        return render(request, 'assist.html', {
            'search': message, 'result': output, 'raw_json': engine_json
        })

    else:
        return render(request, 'assist.html', {
            })

#######################################################################################################################
