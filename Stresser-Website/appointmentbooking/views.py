from django.shortcuts import render
from django.core.mail import send_mail
# Create your views here.
from appointmentbooking.models import  TimeSlot, Specialist
from rest_framework import viewsets, permissions, status
from .serializers import  SpecialistSerializer, TimeSlotSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime


# Lead Viewset

class TimeSlotViewSet(APIView):
    # permission_classes=[permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        bookedobj=TimeSlot.objects.all()
        bookedobjserialize=TimeSlotSerializer(bookedobj,many=True)
        return Response(bookedobjserialize.data)

    def post(self, request):
        
        checkavailability=TimeSlotSerializer(data=request.data)
        if checkavailability.is_valid():
            date_format = "%Y-%m-%d"
            a = datetime.strptime(str(datetime.now().date()), date_format)
            b = datetime.strptime(str(request.data['date']), date_format)
            delta = b - a
            if delta.days >14:
                return Response({"Can't book prior to more than 14 days."})
            elif delta.days < 0:
                return Response({"Invalid Date Selection"})

            created = TimeSlot.objects.filter(slot=request.data['slot'],date=request.data['date'],specialist=request.data['specialist']).exists()
           
            print(request.data['user']['email'])
            if not created:
                newobj=TimeSlotSerializer(data={ 'slot':request.data['slot'],'date':request.data['date'],'specialist':request.data['specialist'],'availability':False })
                if newobj.is_valid():
                    # print(newobj.data)
                    newobj.save()
                    
                    # send_mail('Appointment Reminder', 'Your Appointment has been scheduled with '+str(newobj.validated_data['specialist'])+' on Date:'+str(newobj.validated_data['date'])+'at time'+str(newobj.validated_data['slot']), 'mana999526@gmail.com',['manashreepatel28@gmail.com'], fail_silently=False)
                    # BookingViewSet.post(self,request,newobj.validated_data['user']['id'])
                   
                    
                    return Response(newobj.data,status=status.HTTP_201_CREATED)
                else:
                    return Response(newobj.errors,status=status.HTTP_400_BAD_REQUEST)
            else:
               
                return Response({"Slot not Available"})
        return Response(checkavailability.errors,status=status.HTTP_400_BAD_REQUEST)

# class BookingViewSet(APIView):
#     def get(self, request):
#         bookedobj=Booking.objects.all()
#         bookedobjserialize=BookingSerializer(bookedobj,many=True)
#         return Response(bookedobjserialize.data)

#     def post(self, request, user):
#         print(request.data)
       
        
     
#         bookedobjserialize=BookingSerializer(data={'user':user, 'timestamp':datetime.now(), 'timeslot':id})
#         if bookedobjserialize.is_valid():
#             bookedobjserialize.save()
#             return Response(bookedobjserialize.data,status=status.HTTP_201_CREATED)
#         return Response(bookedobjserialize.errors,status=status.HTTP_400_BAD_REQUEST)

class SpecialistViewSet(APIView):
    def get(self, request):
        specialistobj=Specialist.objects.all()
        specialistobjserialize=SpecialistSerializer(specialistobj,many=True)
        return Response(specialistobjserialize.data)

    def post(self, request):
        specialistobjserialize=SpecialistSerializer(data=request.data)
        if specialistobjserialize.is_valid():
            specialistobjserialize.save()
            return Response(specialistobjserialize.data,status=status.HTTP_201_CREATED)
        return Response(specialistobjserialize.errors,status=status.HTTP_400_BAD_REQUEST)

    
