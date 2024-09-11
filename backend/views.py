from django.http import HttpResponse, Http404
from django.shortcuts import render
from django.conf import settings
import os


def index(request):
    return render(request, 'index.html')


def map_tile(request, z, x, y):
    filepath = os.path.join(settings.BASE_DIR, 'Map', f'z{z}', '0', f'x{x}', '0', f'y{y}.png')
    try:
        with open(filepath, 'rb') as f:
            return HttpResponse(f.read(), content_type="image/png")
    except IOError:
        raise Http404("Tile not found")
