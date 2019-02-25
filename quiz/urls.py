from django.conf.urls import url
from . import views
from quiz.views import QuestionView
urlpatterns = [

    url(r'^$',views.main),
    url(r'^getdata/$',views.getdata),
    ##url(r'^main/$',views.main), #1

    ##url(r'^home/$',views.home),
    ##url(r'^main/quiz/$', views.question_list, name='question_list'),
    url(r'^login/$',views.ulogin),

    #url(r'^loginuser/$',views.login),
    ##url(r'^register/$',views.register),
    #url(r'^user/$',views.user),
    ##url(r'^base/$',views.base),
    ##url(r'^info/$',views.info),
    ##url(r'^quiz/home',views.home),
    url(r'^signup/$',views.signup, name='signup'),
    ##url(r'^categories/$',views.categories),
    ##url(r'^categories2/$',views.categories2),
    ##url(r'^startquiz/$',views.startquiz),
    url(r'^mainquiz/$',views.mainquiz),
    #url(r'^Logout/$',views.Logout),
    url(r'^News/$',views.mainquiz),
    url(r'^Physics/$',views.mainquiz),
    url(r'^Wars/$',views.mainquiz),
    url(r'^Music/$',views.mainquiz),
    url(r'^Biology/$',views.mainquiz),
    url(r'^Language/$',views.mainquiz),
    url(r'^Football/$',views.mainquiz),
    url(r'^Food/$',views.mainquiz),
    url(r'^Geography/$',views.mainquiz),
    #url(r'^Telecom/$',views.startquiz), GAMMEL interface (må ordne på status hvis bruke)
    url(r'^Telecom/$',views.mainquiz),
    url(r'^Sport/$',views.mainquiz),
    url(r'^Movies/$',views.mainquiz),
    url(r'^Math/$',views.mainquiz),
    url(r'^Mountains/$',views.mainquiz),
    url(r'^Rivers/$',views.mainquiz),
    url(r'^Kings/$',views.mainquiz),
    url(r'^History/$',views.mainquiz),
    url(r'^Alcohol/$',views.mainquiz),
    url(r'^Computers/$',views.mainquiz),
    url(r'^Chemistry/$',views.mainquiz),
    url(r'^Mythology/$',views.mainquiz),
    url(r'^TV/$',views.mainquiz),
    url(r'^Art/$',views.mainquiz),
    url(r'^Economy/$',views.mainquiz),
    url(r'^Statistics/$',views.mainquiz),
    url(r'^Programming/$',views.mainquiz),
    ##url(r'^main/$',views.main),
    url(r'^getmsg/$',views.getmsg),

    url(r'^getstatistics/$',views.getstatistics),
    url(r'^savestatistics/$',views.savestatistics),
    url(r'^gethiscore/$',views.gethiscore),
    #url(r'^(?P<pk>[-\w]+)/$',views.mainquiz),
    #url(r'^(?P<pk>[-\w]+)/$',QuestionView.as_view(),name='question-detail'),

]
