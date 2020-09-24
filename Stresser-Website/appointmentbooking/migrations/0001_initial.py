# Generated by Django 3.1 on 2020-09-24 05:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Specialist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialist_name', models.CharField(max_length=100)),
                ('specialist_contact', models.CharField(max_length=13)),
                ('specialist_about', models.CharField(max_length=800)),
            ],
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slot', models.TimeField()),
                ('date', models.DateField()),
                ('availability', models.BooleanField(default=True)),
                ('specialist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointmentbooking.specialist')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('timeslot', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='appointmentbooking.timeslot')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
