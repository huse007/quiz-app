# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-20 16:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0005_person'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='password',
            field=models.CharField(default='pwd', max_length=200),
        ),
    ]
