# Generated by Django 3.1.13 on 2021-10-24 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transfer', '0002_auto_20211012_2150'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transferevaluation',
            name='sem_year_taken',
        ),
        migrations.AlterField(
            model_name='school',
            name='state_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
