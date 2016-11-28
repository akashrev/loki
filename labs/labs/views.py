#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json

# function for labs index webpage

def index(request):
    return render(request, 'index.html', {
            })


# function for the localization function

def translator_request(message):
    translation_score = []
    translation_list = []
    #message = "Buy puma casual shoes at a discount of 50 at select stores."
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    def data():
        return {
            "data": [
                message
            ]
        }

    response = requests.post('http://52.163.231.207:8000/translator/', headers=headers, json=data())
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    #return json_response
    new_json = json.loads(json_response)
    for keyy, valuee in new_json.items():  # dictionary/JSON
        for list1 in valuee:  # first list
            for item in list1:  # second list
                for key, value in item.items():  # dictionaries
                    if key == 'translation':
                        translation_list.append(value)  # append translation data in a list
                    if key == 'translation_score':
                        output = round(value, 3)
                        translation_score.append(output)    # append translation_score data in a list
    #translation_list = [x.encode('utf-8') for x in translation_list]
    zipped = zip(translation_list, translation_score)
    return zipped, json_response


# function for localization API on labs

def localization(request):

    if request.GET.get('submit'):
        message = request.GET.get('search')

        result, json = translator_request(message)
        return render(request, 'localization.html', {
            'search': message, 'result': result, 'raw_json': json,
        })

    else:
        #result = ''
        return render(request, 'localization.html', {
            #'result': result,
            })


# function for the transliteration function

def transliterateapi_request(message):
    def query():
        return {
            "inArray": [
                message
            ],
            "REV-APP-ID": "rev.web.com.rev.master",
            "REV-API-KEY": "9757f28c968b561ea36ffbea2ff562679148",
            "domain": 3,
            "language": "hindi",
            "originLanguage": "hindi",
            "webSdk": 0
        }

    response = requests.post('http://api.reverieinc.com/parabola/transliterateSimpleJSON', json=query())
    #print response
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    new_json = json.loads(json_response)
    for key, value in new_json.items():
        if key == 'outArray':
            for item in value:
                for key, value in item.items():
                    if key == "transResponse":
                        return value


# function for the transliteration

def transliteration(request):

    if request.GET.get('submit'):
        message = request.GET.get('search')
        output = transliterateapi_request(message)
        return render(request, 'transliteration.html', {
            'output': output, 'search': message,
    })

    else:
        return render(request, 'transliteration.html', {
    })
