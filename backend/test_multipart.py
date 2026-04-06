import traceback, sys
try:
    from python_multipart import __version__
    print('python_multipart version:', __version__)
except Exception as e:
    traceback.print_exc(file=sys.stdout)
try:
    from multipart import __version__
    print('multipart version:', __version__)
except Exception as e:
    traceback.print_exc(file=sys.stdout)
