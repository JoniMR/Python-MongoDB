from server.models import Bancos
from fastapi import APIRouter
from server.dbconfig import db

#Esto arregla la compatibilidad entre ObjectId de MongoDB y el tipo str

from pydantic import json
from bson.objectid import ObjectId

json.ENCODERS_BY_TYPE[ObjectId]=str

#############################

bancos_router = APIRouter()

@bancos_router.get("/bancos")
async def get_bancos():
  return list(db.bancos.find())

@bancos_router.get("/bancos/{id}")
async def get_bancos(id: str):
  return db.bancos.find_one({"_id": ObjectId(id)})

@bancos_router.post("/bancos")
async def post_bancos(bancos: Bancos):
  nuevo_bancos = dict(bancos)
  id = db.bancos.insert_one(nuevo_bancos).inserted_id
  return str(id)

@bancos_router.put("/bancos/{id}")
async def put_bancos(id: str, bancos: Bancos):
  db.bancos.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(bancos)})

@bancos_router.delete("/bancos/{id}")
async def delete_bancos(id: str):
  db.bancos.find_one_and_delete({"_id": ObjectId(id)})