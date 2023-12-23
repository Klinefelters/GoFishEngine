from setuptools import setup, find_packages

setup(
    name='gofish',
    version='0.1.0',
    description='Still deciding',
    url='https://github.com/klinefelter/GoFish',
    author='Steven Klinefelter',
    author_email='klinefelters@etown.edu',
    license='MIT',
    packages=find_packages(),
    package_data={
        'gofish': ['api/static/*', 'api/static/*/*'],
    },
    install_requires=[
        'mpi4py',
        'attrs',
        'flask',
        'flask-cors',
        'flask-socketio'
    ],

    classifiers=[
        'Development Status :: 1 - Planning',
        'Programming Language :: Python :: 3.11.6',
    ],
)
