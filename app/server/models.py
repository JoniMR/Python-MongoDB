from typing import Optional
from pydantic import BaseModel

class Bancos(BaseModel):
  _id: Optional[str]
  nombre: str
  bicswift: str
  direccion: str
  telefono: str
  provincia: str
  localidad: str

  