from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home),
    path('chat/<option>', views.chat),
    path('sendBot', views.sendBot, name='sendBot'),
    path('chat/save/', views.save),
    path('chat/history/', views.history, name='history'),
    path('chat/view/<id>', views.view),
    path('chat/delete/<id>', views.delete),
]