# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-22 16:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0006_person_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='password',
            field=models.CharField(max_length=200),
        ),
    ]