from pymongo import MongoClient
conn = MongoClient("mongodb+srv://jonathancdp:123root@cluster0.knockso.mongodb.net/?retryWrites=true&w=majority")
db = conn.bancos

