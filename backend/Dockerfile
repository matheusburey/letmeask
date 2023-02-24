FROM python:3.11-alpine

WORKDIR /home/backend

COPY requirements.txt ./

RUN pip install -r requirements.txt

EXPOSE 8000

COPY . .

CMD ["uvicorn", "app.main:app", "--reload", "--host=0.0.0.0"]