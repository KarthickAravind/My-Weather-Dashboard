from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class CityName(BaseModel):
    name: str

@app.post("/weather/")
async def get_weather(city: CityName):
    api_key = os.getenv("API_KEY")
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city.name}&limit=1&appid={api_key}"
    response = requests.get(geo_url)
    if response.status_code == 200 and response.json():
        lat = response.json()[0]['lat']
        lon = response.json()[0]['lon']
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        weather_response = requests.get(weather_url)
        if weather_response.status_code == 200:
            return weather_response.json()
    raise HTTPException(status_code=404, detail="City not found")
print("Starting FastAPI app...")