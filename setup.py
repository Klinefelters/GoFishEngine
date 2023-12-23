from setuptools import setup, find_packages

setup(
    name='gofish',
    version='1.0.0',
    description='A python go fish engine for testing AI players.',
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
        'flask-cors'
    ],

    classifiers=[
        'Development Status :: 2 - Pre-Aplha',
        'Framework :: Flask',
        'Natural Language :: English',
        'Programming Language :: Python :: 3.11',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.8',
    ],
)
