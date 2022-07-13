echo -e "install requirements... /n"
pip install -r requirements.txt
echo -e "start server... /n"
uvicorn app.main:app
