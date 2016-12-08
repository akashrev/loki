from django.shortcuts import render, redirect, HttpResponseRedirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, update_session_auth_hash, login
from django.core.mail import send_mail


# Create your views here.


# base.html for testing
def base(request):
    return render(request, 'basee.html', {
            })


# homepage
def index(request):
    username = request.session.get('username')
    return render(request, 'auth_index.html',
        {"username": username}
    )


# success webpage
def success(request):
    return render(request, 'success.html', {
    })


# new user registration
def registration(request):
    if request.method == 'POST':
        username = request.POST['username']
#        first_name = request.POST['fname']
#        last_name = request.POST['lname']
        email = request.POST['email']
        password = request.POST['password']
        password1 = request.POST['password1']
        if password == password1:
            if username and email and password:
                user = User.objects.create_user(username, email,  password)
    #            user.first_name = first_name
    #            user.last_name = last_name
                user.save()
                return HttpResponseRedirect('/login/')
            else:
                return HttpResponseRedirect('/registration/')
        else:
            return HttpResponseRedirect('/registration/')
    elif request.method == 'GET':
        return render(request, 'registration.html', {
            })


# logout
def user_logout(request):
    try:
        del request.session['username']
    except KeyError:
        pass
    return HttpResponseRedirect('/index/')


# user login
def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        #import ipdb; ipdb.set_trace()
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                request.session['username'] = username
                # response = HTTPResponse()
                response = HttpResponseRedirect('/dashboard/')
                response.set_cookie('key', 'value')
                return response
                #return "success"
            else:
                return HttpResponseRedirect('/login/')
                # pass
                # Return 'Account is not active'
                # Return a 'disabled account' error message
        else:
            return HttpResponseRedirect('/login/')
            # Return 'invalid login'
            # Return an 'invalid login' error message.
    elif request.method == "GET":
        return render(request, 'login.html', {
    })


def dashboard(request):
    username = request.session.get('username')
    return render(request, 'user_dashboard.html',
        {"username": username}
    )


def cookiee(request):
#    response = HttpResponse()
    response = render(request, 'user_dashboard.html',{})
    response.set_cookie(key='key', value='value')
    return response


'''
def send_email(request):
    subject = request.POST.get('subject', '')
    message = request.POST.get('message', '')
    from_email = request.POST.get('from_email', '')
    if subject and message and from_email:
        try:
            send_mail(subject, message, from_email, ['admin@example.com'])
        except BadHeaderError:
            return HttpResponse('Invalid header found.')
        return HttpResponseRedirect('/contact/thanks/')
    else:
        # In reality we'd use a form class
        # to get proper validation errors.
        return HttpResponse('Make sure all fields are entered and valid.')
'''


def send_email(request):
    send_mail(
        'Subject here',
        'Here is the message.',
        'django@example.com',
        ['akash.jain@reverieinc.com'],
        fail_silently=False,
    )
    return HttpResponseRedirect('/dashboard/')


"""
# password_change
def password_change(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
    else:
        pass
"""
