#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json
from django.http import HttpResponse
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

def labsTransliterate(request):

        return render(request, 'labs-transliterate.html', {
            #'result': result,
    })


# function for the transliteration function

def transliterateapi_request(message, language, domain):
    url = "https://api-gw.revup.reverieinc.com/apiman-gateway/ReverieLabs/transliteration/1.0"

    querystring = {"source_lang": "english", "target_lang": language, "domain": domain}

    headers = {
        'rev-api-key': "2nReLrtFB5BkH6oOkmiytPJPXs39RXXHXuoO",
        'rev-app-id': "com.reverie.labs",
        'content-type': "application/json",
        'Accept-Encoding': None

    }

    data = {
        "data": [
            message
        ]
    }

    response = requests.request("POST", url, headers=headers, params=querystring, json=data)
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    new_json = json.loads(json_response)

    for key, value in new_json.items():
        for item in value:
            for key, value in item.items():
                if key == "outString":
                    for string in value:
                        return string


# function for the transliteration

def transliteration(request):

   # if request.GET.get('submit'):
    if request.GET.get('search'):
        message = request.GET.get('search')
        language = request.GET['language']
        output = transliterateapi_request(message,language)
        return render(request, 'transliteration.html', {
            'output': output, 'search': message,
    })

    else:
        return render(request, 'transliteration.html', {
    })

def assistedLocalization(request):
        return render(request, 'assistedLocalization.html', {
    })

def labstransliteration(request):

   # if request.GET.get('submit'):
    if request.GET.get('search'):
        message = request.GET.get('search')
        language = request.GET['language']
        domain = request.GET['domain']
        output = transliterateapi_request(message,language,domain)
        return HttpResponse(json.dumps({'output': output
            }))