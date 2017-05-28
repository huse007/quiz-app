# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-20 07:52
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_question_published_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='question',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='quiz.Question'),
            preserve_default=False,
        ),
    ]
