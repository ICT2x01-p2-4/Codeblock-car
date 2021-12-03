# Generated by Django 3.2.9 on 2021-12-02 04:57

import codingPage.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Command',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(max_length=30)),
                ('code', models.IntegerField(validators=[codingPage.validators.validate_action_code])),
            ],
        ),
    ]