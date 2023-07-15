from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from models.personas.personas_api import Persona, PersonaSinId
from repository.personas_repository import PersonasRepository

# Router:
personas_api = APIRouter(
    prefix='/personas', tags=['Personas'])

# Repository:
personas_repository = PersonasRepository()

# Endpoints:


@personas_api.get('', response_model=list[Persona])
def get_all(db=Depends(get_db)):
    return personas_repository.get_all(db)


@personas_api.get('/{id}', response_model=Persona)
def get_by_id(id: int, db=Depends(get_db)):
    persona = personas_repository.get_by_id(id, db)
    if persona is None:
        raise HTTPException(
            status_code=404, detail="Persona no encontrada")
    return persona


@personas_api.post('', response_model=Persona)
def create(persona: PersonaSinId, db=Depends(get_db)):
    return personas_repository.create(persona, db)
