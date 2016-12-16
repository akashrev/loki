#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json


# Create your views here.
def assist_api(message):

    url = "http://search.beta.reverieinc.com/search"

    querystring = {"target_lang": "hindi", "source_lang": "english", "domain": "3"}

    headers = {
        'Content-Type': 'application/json',
    }

    data = {"text": [message], "domains": ["retail"], "search_fields": ["entity"],
            "ret_fields": ["entity", "entity_type", "meta"], "pivot_fields": ["meta"], "accuracy": [95]}

    response = requests.request("POST", url, headers=headers, json=data)
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    new_json = json.loads(json_response)
    #    return json_response
    c = []
    for key, entities in new_json.items():
        if key == 'entities':
            for item in entities:
                a = b = []
                b.append(item)
                for item in b:
                    for key, value in item.items():
                        if key == "category":
                            for key, value in value.items():
                                print key, value
                                c.append(key)
                                c.append(value)
                        elif key == "terms":
                            for item in value:
                                for key, value in item.items():
                                    a = []
                                    if isinstance(value, list):
                                        for i in value:
                                            a.append(i)
                                            # print i
                                    else:
                                        print value, ':'
                                        c.append(value)
                                print a
                                c.append(a)
                                print

    return c, json_response

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

####################################################################################################################
