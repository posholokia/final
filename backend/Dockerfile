FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /app/back

COPY requirements.txt /app/back/requirements.txt

RUN pip install --upgrade pip && \
    pip install -r /app/back/requirements.txt


COPY . /app/back

EXPOSE 8000