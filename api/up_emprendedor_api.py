from fastapi import APIRouter
from models.unidades_productivas.emprendedores_api import Emprendedor
from repository.emprendedores_repository import EmprendedoresRepository

# Router:
emprendedores_api = APIRouter(
    prefix='/emprendedores', tags=['Emprendedores'])

# Repository:
emprendedores_repository = EmprendedoresRepository()

# Endpoints:


@emprendedores_api.get('', response_model=list[Emprendedor])
def get_all():
    return emprendedores_repository.get_all()
