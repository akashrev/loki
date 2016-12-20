#!/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, update_session_auth_hash, login
from django.core.mail import send_mail, EmailMessage

import requests, json

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
                        translation_score.append(value)    # append 'translation_score' data in a list
    #translation_list = [x.encode('utf-8') for x in translation_list]
    zipped = zip(translation_list, translation_score)   # 'zipped' becomes dictionary { hindi o/p : engine_name }
    return zipped, json_response


def translator_reverie(message):
#    url = "http://beta.auth.revup.reverieinc.com/apiman-gateway/ReverieMobility/Localization/1.0"
    url = "https://api-gw.revup.reverieinc.com/apiman-gateway/labs/localization/1.0"

    querystring = {"target_lang": "hindi", "source_lang": "english", "domain": "3"}

    headers = {
        'content-type': "application/json",
        'rev-api-key': "HQR83FQDpcDwrEoavyunux13O55JyFpmCPwc",
        #'rev-api-key': "1gMnmV0vdkBNkS1SY3uaCMkh3cL883MyPNps",
        #'rev-app-id': "com.mobility.android",
        'rev-app-id': "labs.test.api",
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
    username = request.session.get('username')

    if request.GET.get('submit'):
        message = request.GET.get('search')

        engine_result, engine_json = translator_engine(message)

        reverie_result, reverie_json = translator_reverie(message)

        output = engine_result+reverie_result
        return render(request, 'localization.html', {
            'search': message, 'result': output, 'raw_json': engine_json+'\n'+reverie_json, "username": username
        })

    else:
        #result = ''
        return render(request, 'localization.html', {
        "username": username
            #'result': result,
            })

def labsTransliterate(request):

        return render(request, 'labs-transliterate.html', {
            #'result': result,
    })


####################################################################################################################
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
    username = request.session.get('username')
    if request.GET.get('search'):
        message = request.GET.get('search')     # reading text from textbox
        language = request.GET['language']      # fetching selected language
        output = transliterateapi_request(message,language, 1) # calling function, sending text and language as parameters
        return render(request, 'transliteration.html', {    # returning output text to the webpage
            'output': output, 'search': message, "username": username
    })

    else:
        return render(request, 'transliteration.html', {
            "username": username
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

def requestLocalization(request):

   # if request.GET.get('submit'):
    if request.POST and request.FILES:
        
        usrinfo = {"name" : request.POST.get('username') , "email": request.POST.get('email'), "contact":request.POST.get('contact'), "organization":request.POST.get('organization')}
        print usrinfo
        info = json.dumps(usrinfo)
        file = request.FILES['file']
        mail = EmailMessage("New Assisted Localization Request", info, "revup@reverieinc.com", ["sidharth.sahu@reverieinc.com"])
        mail.attach(file.name, file.read(), file.content_type)
        mail.send()
        return HttpResponse(json.dumps({'output': "successfully uploaded"
                }))







