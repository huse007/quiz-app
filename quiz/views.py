from django.shortcuts import render,redirect
from .models import Question,Choice,Person,Category,Categoryscore
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.urlresolvers import reverse
#from .forms import LoginForm
from .forms import PersonForm, UserForm, MyForm
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in,user_logged_out
from .forms import QuestionForm
from django.views.generic.detail import DetailView
from django.utils import timezone
import json
from django.utils.encoding import force_text
from django.core.serializers.json import DjangoJSONEncoder
from django.core.serializers import serialize
from django.core import serializers

# Create your views here.
status = "login"
number = 0
number_of_questions = 5
class QuestionView(DetailView):
    model = Question
    def get_context_data(self,**kwargs):
        context = super(QuestionView,self).get_context_data(**kwargs)
        context['now'] = timezone.now()
        context['choice'] = Choice.objects.all()
        #context['choice'] = Choice.objects.get(pk=1)
        q=Question.objects.get(pk=1)
        print(q.choice_set.all())
        context['valg'] = q.choice_set.all()
        return context

def signup(request):
    if request.method=='POST':
        print("signup()")
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username = username,password = raw_password)
            login(request,user)
            return redirect('/main')
    else:
        print("signup() else")
        form = UserCreationForm()
    print("signup() utenfor")
    return render(request, 'quiz/signup.html',{'form':form})

    

"""
def loginuser(request):
    if request.method=='POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleanded_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username = username,password = raw_password)
            login(request,user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'loginuser.html',{'form':form})
"""            
def question_list(request):
    questions = Question.objects.all()
    return render(request, 'quiz/question_list.html',{'questions':questions})
def startpage(user):
    print("startpage_metoden")
    return render(request, 'quiz/startpage.html',{})

@login_required
def home(request):
    if request.method == 'POST': #Når den har fått input havner den her
        form = MyForm(request.POST)
        print("NNNNN",form.field)
        if form.is_valid():
            print(form.cleaned_data["letters"])
            #i = MyForm.get_next(form)
            return render(request,'quiz/home.html',{'status':status,'form':form})
            #            return HttpResponseRedirect('quiz/home.html') #send til neste spørsmål
    else:#første gang havner den her og presenterer en tom form og html filen
        form = MyForm()
    return render(request,'quiz/home.html',{'status':status,'form':form})

"""
@login_required
def home(request):
    if request.method =='POST':
        data = {'navn':'anders'}
        f = TestForm(data)
"""
def categories(request):
    categories = Category.objects.all()
    return render(request, 'quiz/categories.html',{'categories':categories,'status':status})
def categories2(request):
    categories = Category.objects.all()
    return render(request, 'quiz/categories2.html',{'categories':categories,'status':status})
#class LazyEncoder(DjangoJSONEncoder):
#    def default(self,obj):
#        if isinstance(obj, YourCustomType):
#            return force_text(obj)
#        return super(LazyEncoder, self).default(obj)

def startquiz(request):
    number_of_questions = 5
    cat = request.path.strip('/')
    c = Category.objects.get(category_name =cat)
    q = c.question_set.all().order_by('?')[:number_of_questions]
    #c = choice_set.all()
    clist = []
    print(q)
    for item in q:
        c = item.choice_set.all()# order_by('question')
        #for i in c:
        #    print("i.question: ",i.question)    
        clist.append(serialize('json',c,fields=['choice_name','question','is_correct']))
    qlist = serialize('json',q,fields=('question_name'))
    
    #clist = serialize('json',clist)
    #clist = serialize('json',c,fields=('choice_name'))
    print("Alle: ",clist)
    print("ferdig")
    return render(request, 'quiz/startquiz.html',{'status':status,'qlist':qlist,'clist':clist})

def statistics():
    print("statistics()")
    cnumber = Category.objects.all().count()
    qnumber = Question.objects.all().count()

    print("cnumber: ",cnumber)
    print("qnumber: ",qnumber)
    return {"cnumber":cnumber,"qnumber":qnumber}

@login_required(login_url='/main')        
def mainquiz(request):
    print("mainquiz() status",status)
    number_of_questions = 10
    cat = request.path.strip('/')
    c = Category.objects.get(category_name =cat)
    q = c.question_set.all().order_by('?')[:number_of_questions]
    #c = choice_set.all()
    clist = []
    print(q)
    for item in q:
        c = item.choice_set.all()# order_by('question')
        #for i in c:
        #    print("i.question: ",i.question)    
        clist.append(serialize('json',c,fields=['choice_name','question','is_correct']))
    qlist = serialize('json',q,fields=('question_name'))

    #clist = serialize('json',clist)
    #clist = serialize('json',c,fields=('choice_name'))
    print("Alle: ",clist)
    print("ferdig")
    return render(request, 'quiz/mainquiz.html',{'status':status,'qlist':qlist,'clist':clist,'cat':cat})

    

"""
@login_required
def startquiz(request):
    print("Starter quizen!")
    c = Category.objects.filter(category_name='News')
    i = c.first()
    print(i)
    print(i.pk)
    
    question_list = Question.objects.filter(category=i.pk)
    print(question_list)
    choice_list = Choice.objects.all()

    form = QuestionForm(request.POST)
    print("*************")
    print(form)
    if form.is_valid():
            return render(request, 'quiz/tartquiz.html',{'status':status,'question_list':question_list, 'choice_list':choice_list,'form':form})
    return render(request, 'quiz/startquiz.html',{'status':status,'question_list':question_list, 'choice_list':choice_list,'form':form})
"""    
def base(request):
    return render(request, 'quiz/base.html',{})
def info(request):
    return render(request, 'quiz/info.html',{"status":status})

def main(request):
    print("main()")
    global status
    categories = Category.objects.all()
    stats =statistics();
    print("main() -> status: ",status)
    """    form = UserForm(request.POST or None)  
    if request.method == 'POST':
    print("main() POST")
    if form.is_valid():
    form.save()
    username = form.cleaned_data.get('user_name')
    raw_password = form.cleaned_data.get('password')
    user = authenticate(username = username,password = raw_password)
    login(request,user)
    return render(request, 'quiz/main.html',{"categories":categories,"status":status,'cnumber':stats['cnumber'],'qnumber':stats['qnumber'],'form':form})
    else:
    return redirect('register')
    """
    if request.method == 'GET':
        print("main() GET")
        print("svarer på get med status: ",request)
        context={"status":status,"cnumber":stats["cnumber"],"qnumber":stats["qnumber"]}
        print("context: ",context)
        return render(request, "quiz/main.html",context)
    print(stats['qnumber'])
    return render(request, 'quiz/main.html',{"categories":categories,"status":status,'cnumber':stats['cnumber'],'qnumber':stats['qnumber']})

#def user(request):
#    return render(request, 'quiz/user.html',{})
def getmsg(request):
    msg=request.GET.get('msg',None)
    print("message",msg)
    msg="hallo"
    data2={"msg":msg}
    return HttpResponse('Hello World')
def getdata(request):
    print("getdata()")
    if request.method=='GET':
        print("get request")
        categories_json = serialize('json',Category.objects.all()) 
        print(">>>>>",categories_json)
        return JsonResponse(categories_json,safe=False)
    print("something went wrong")
    return render(request,'quiz/main.html',{})
def savestatistics(request):
    if request.method =='POST':
        uname = "guest"
        print("POSTING")
        input = request.POST.get('data',None)
        parsed_input = json.loads(input)
        print("=",parsed_input["c"])
        print("=",parsed_input["p"])
        category_object = Category.objects.get(category_name =parsed_input["c"])
        if request.user.is_authenticated():
           uname = request.user.username
        database = Categoryscore(category = category_object,points=parsed_input["p"],person=request.user)
        database.save()
        msg = "succsessfull"
        return render(request,'quiz/main.html')
    print("NEI")
    return HttpResponse('/quiz/main.html')
def gethiscore(request):
    #format: hi_list = {"Music":category_table,"History":category_table,...}
    hiscore_map = {}
    if request.method =='GET':
        hiscore_map ={}
        for i in Category.objects.all():
            h = i.categoryscore_set.all().order_by('-points')[:10]
            category_obj_list = list(h)
            category_table = []
            for j in category_obj_list:
                p = str(j.points)
                u = str(j.person.username)
                c = str(j.category)
                row = p
                row +=" "
                row +=u
                row +=" "
                row +=c
                print("row",row)
                category_table.append(row)
            hiscore_map[i.category_name] = json.dumps(category_table);
            print("TESTING MAP")
        print(hiscore_map['Music'])
        return JsonResponse(hiscore_map,safe=False)
    return render(request,'quiz/main.html')

def getstatistics(request):    
    cnumber = Category.objects.all().count()
    qnumber = Question.objects.all().count()
    c = Category.objects.all()
    cs = Categoryscore.objects.all().count()
    print("Categoryscore: ",cs)
    num_qincat = {}
    for i in c:
        num_qincat[str(i)]=Question.objects.filter(category=i).count()
 #   qtest = Question.objects.filter(category="1").count()
  #  print("qtest: ",qtest)
    stats = {"qnumber":qnumber,"cnumber":cnumber,"numqincat":num_qincat,"status":status}
    #json_stats = serialize('json',Question.objects.all().count())-->
    print(stats)
    return JsonResponse(stats,safe=False)
def register(request):
    title='Welcome'
    form = PersonForm(request.POST or None)
    context={"title":title,"form":form}
    if form.is_valid():
        form.save()
        #instance = form.save(commit=False)
        #print(instance)
        context = {"title":"Thanks"}
        
        return redirect("/user")
    return render(request,"quiz/register.html",context)

@receiver(user_logged_in)
def logged_in(request,**kwargs):
    global status
    status="logout"
    print("You logged in. Fixing status to: ",status)
@receiver(user_logged_out)
def logged_out(request,**kwargs):
    global status
    status = "login"
    print("You logged out. Fixing status to: ",status)

