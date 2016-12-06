#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json

###################################################################################################################
# function for labs index webpage

def index(request):
    return render(request, 'index.html', {
            })


###################################################################################################################
# function for the localization function


def translator_engine(message):
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

    response = requests.post('http://52.187.32.148:8000/translator/', headers=headers, json=data())
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    #return json_response
    new_json = json.loads(json_response)
    for keyy, valuee in new_json.items():  # dictionary/JSON
        for list1 in valuee:  # first list
            for item in list1:  # second list
                for key, value in item.items():  # dictionaries
                    if key == 'translation':
                        translation_list.append(value)  # append translation data in a list
                    if key == 'engine':
                        #output = round(value, 3)
                        translation_score.append(value)    # append translation_score data in a list
    #translation_list = [x.encode('utf-8') for x in translation_list]
    zipped = zip(translation_list, translation_score)   #zipped becomes dictionary ( hindi o/p : engine_name)
    return zipped, json_response


def translator_reverie(message):
    url = "http://beta.auth.revup.reverieinc.com/apiman-gateway/ReverieMobility/Localization/1.0"

    querystring = {"target_lang": "hindi", "source_lang": "english", "domain": "3"}

    headers = {
        'content-type': "application/json",
        'rev-api-key': "1gMnmV0vdkBNkS1SY3uaCMkh3cL883MyPNps",
        'rev-app-id': "com.mobility.android",
        'cache-control': "no-cache",
        'postman-token': "c626987f-0ce2-5f6a-7909-321db1bb3fe0"
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
                    zipped = zip([value], ['reverie'])
                    return zipped, json_response


#######################################
# function for localization API on labs

def localization(request):

    if request.GET.get('submit'):
        message = request.GET.get('search')

        engine_result, engine_json = translator_engine(message)

        reverie_result, reverie_json = translator_reverie(message)

        output = engine_result+reverie_result
        return render(request, 'localization.html', {
            'search': message, 'result': output, 'raw_json': engine_json+'\n'+reverie_json,
        })

    else:
        #result = ''
        return render(request, 'localization.html', {
            #'result': result,
            })


####################################################################################################################
# function for the transliteration function

# function takes input text and language as parameters and sending the request to the Transliteration API
def transliterateapi_request(message, language):
    url = "https://api-revup.reverieinc.com/apiman-gateway/akashWSXI/transliteration/1.0"

    querystring = {"source_lang": "english", "target_lang": language}       # language selection

    headers = {
        'rev-api-key': "b6aCmKy8Aq5TddB4OIIydmbqLuTvJv8KKWkG",
        'rev-app-id': "com.akash.jain",
        'content-type': "application/json",
        'Accept-Encoding': None

    }

    data = {
        "data": [
            message                 # input text message
        ]
    }

    response = requests.request("POST", url, headers=headers, params=querystring, json=data)    # sending request
    json_response = json.dumps(response.json(), ensure_ascii=False, indent=4, sort_keys=True).encode('utf-8')
    new_json = json.loads(json_response)
    # getting output from JSON response
    for key, value in new_json.items():
        for item in value:
            for key, value in item.items():
                if key == "outString":
                    for string in value:
                        return string


##################################
# function for the transliteration

def transliteration(request):

   # if request.GET.get('submit'):
    if request.GET.get('search'):
        message = request.GET.get('search')     # reading text from textbox
        language = request.GET['language']      # fetching selected language
        output = transliterateapi_request(message,language) # calling function, sending text and language as parameters
        return render(request, 'transliteration.html', {    # returning output text to the webpage
            'output': output, 'search': message,
    })

    else:
        return render(request, 'transliteration.html', {
    })
