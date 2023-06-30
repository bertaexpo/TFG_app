from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Chat, ChatLine
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import openai, os
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_KEY", None)

messages_init = [
    {
        "role": "system",
        "content": "Actúa como un asistente personal. Puede responder a preguntas, planificar clases de asignaturas, corregir redaciones, generar preguntas para examen, generar problemas matemáticos, explicar conceptos nuevos."
    }
]

messages = [
    {
        "role": "system",
        "content": "Actúa como un asistente personal. Puede responder a preguntas, planificar clases de asignaturas, corregir redaciones, generar preguntas para examen, generar problemas matemáticos, explicar conceptos nuevos."
    }
]

options = {
    'option1': 'Has seleccionat planificar una classe sobre una assignatura o tema. Sobre què vols planificar la classe i a qui va dirigida?',
    'option2': 'Has seleccionat corregir les errades ortogràfiques de una redacció. Escriu-me el text que vols corregir i especifica en quin idioma està escrit:',
    'option3': 'Has seleccionat generar preguntes per fer un examen, ¿Sobre quina matèria o assignatura vols les preguntes? ',
    'option4': 'Has seleccionat redactar un correu electrònic per fer un comunicat, escriu-me el tema del comunicat i a qui va dirigit:',
    'option5': 'Has seleccionat crear un problema matemátic. Especifica quins procediments vols que es treballin en el problema:',
    'option6': 'Has seleccionat crear activitats interactives o jocs pels alumnes. Sobre quina matèria o tema vols que tracti?',
    'option7': 'Has seleccionat explicar un concepte nou de manera creativa. Quin és el concepte que vols explicar?',
}

contexts = {
    'option1': 'Sóc una professora i necessito planificar una clase de la assignatura o matèria |msg|',
    'option2': 'Sóc una professora i necessito que em diguis les errades ortogràfiques de la redacció |msg|',
    'option3': 'Sóc una professora i necessito que em proposis preguntes de tipo test i també de respostes obertes per fer un examen sobre la asignatura o materia |msg|',
    'option4': 'Sóc professora i necessito redactar un email per a fer un comunicat sobre |msg|',
    'option5': 'Sóc professora i necessito que em generis un problema matemátic per resoldre amb la solució sobre el tema de |msg| ',
    'option6': 'Sóc professora i necessito crear una activitat interactiva o joc dinàmic per a aprendre i treballar sobre la asignatura o materia |msg|',
    'option7': 'Sóc professora i necessito idees sobre com explicar de manera creativa, innovadora i cautivadora un nou concepte que és |msg|'
}

first_message = True

@login_required
def home(request):
    return render(request, 'home.html')

@login_required
def chat(request, option):
    global first_message, messages
    first_message = True
    messages = messages_init
    return render(request, 'chat.html', {'option': option, 'msg': options[option]})

def sendBot(request):
    if openai.api_key is not None and request.method == 'POST':
        global first_message
        print(first_message)
        option = request.POST['option']
        msg_user = request.POST['msg_user']
        
        if first_message:
            context = contexts[option]
            msg = context.replace('|msg|', msg_user)
            first_message = False
        else:
            msg = msg_user
        
        messages.append({"role": "user", "content": msg})
        openai_response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages, max_tokens=2000)
        response_text = openai_response.choices[0].message.content
        messages.append({"role": "assistant", "content": response_text})
        return JsonResponse({"msg_bot": response_text})
    else:
        print("error")
        return JsonResponse({"error": True})
    
def save(request):
    title = request.POST['title']
    description = request.POST['description'] if request.POST['description'] else None
    chat = Chat.objects.create(title=title, description=description,user=request.user)
    
    for message in messages:
        if message['role'] != 'system':
            is_bot = True if message['role'] == 'assistant' else False
            ChatLine.objects.create(content=message['content'], is_bot=is_bot,chat=chat)

    return redirect("history")

@login_required
def history(request):
    chats = Chat.objects.filter(user=request.user)
    return render(request, 'history.html', {'chats': chats})

@login_required
def view(request, id):
    chat = Chat.objects.get(id=id)
    chat_lines = ChatLine.objects.filter(chat=chat)
    return render(request, 'chat_view.html', {'chat': chat, 'chat_lines': chat_lines})

def delete(request, id):
    chat = Chat.objects.get(id=id)
    chat.delete()
    return redirect("history")