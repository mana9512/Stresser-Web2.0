# Generated by Django 3.1 on 2020-09-18 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DASScore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('Dscore', models.IntegerField()),
                ('Ascore', models.IntegerField()),
                ('Sscore', models.IntegerField()),
            ],
        ),
    ]