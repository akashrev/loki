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
    for key, entities in new_json.items():  # initial json

        d = dict()
        e = []
        if key == 'entities':  # accessing data for entities key

            for item in entities:  # iterating list of 'entities' value
                a = []
                b = []
                d = dict()
                b.append(item)
                for i, item in enumerate(b):

                    # print 'raw: ',item
                    # print i

                    for key, value in item.items():

                        if key == "category":
                            # print value
                            for key, ivalue in value.items():
                                d[key] = ivalue
                                # print d

                        elif key == 'terms':
                            for item in value:
                                for keys, values in item.items():
                                    if keys == 'token':
                                        # print values
                                        nkey = values
                                    else:
                                        d[nkey] = values
                    # print 'clean: ',d
                    if d == ' ':
                        continue
                    else:
                        c.append(d)

                    print '\n \n'
                    break
    print c

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
