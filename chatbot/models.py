from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return "%s %s %s" % (self.title, self.user.username, self.description)
    
class ChatLine(models.Model):
    content = models.TextField()
    is_bot = models.BooleanField()
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    
    def __str__(self):
        return "%s %s %s %s" % (self.content, self.is_bot, self.chat.title, self.chat.user.username)