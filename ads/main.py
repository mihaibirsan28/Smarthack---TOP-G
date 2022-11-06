from fastapi import FastAPI
from ad_generator import workflow


app = FastAPI()


@app.get("/{team}")
async def root(team):
    text = workflow(team)
    return {"text" : text}