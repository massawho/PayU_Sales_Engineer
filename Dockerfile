FROM python:3.10-rc-alpine3.13

RUN pip install Flask

ENV FLASK_APP paymentsos

WORKDIR /app
COPY . .
CMD ["flask", "run", "--host", "0.0.0.0"]
