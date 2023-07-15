from api.up_emprendedor_api import emprendedores_api
from api.persona_api import personas_api
from api.ubi_provincia_api import provincias_api
from api.ubi_localidad_api import localidades_api

from fastapi.middleware.cors import CORSMiddleware  # Error de CORS
import database
from fastapi import FastAPI
import uvicorn

import models.unidades_productivas.emprendedores_bd
import models.ubicaciones.localidades_bd
import models.ubicaciones.provincias_bd
import models.personas.personas_bd

# Crea las tablas que corresponden a las entidades definidas en los modelos de BD.
database.create_all()

# Crea servidor FastAPI
app = FastAPI()

# # Rutas endopoints
app.include_router(emprendedores_api)
app.include_router(provincias_api)
app.include_router(localidades_api)
app.include_router(personas_api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run('plataforma:app', reload=True)
