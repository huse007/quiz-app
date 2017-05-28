from django.contrib import admin
from .models import Question,Choice,Person,Category
# Register your models here.

#admin.site.register(Question)
#admin.site.register(Choice)
#admin.site.register(Person)
admin.site.register(Category)


class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields':['question_name','category']}),
        ('Date information',{'fields':['published_date'],'classes':
                             ['collapse']}),
        ]
    inlines = [ChoiceInline]
admin.site.register(Question,QuestionAdmin)
