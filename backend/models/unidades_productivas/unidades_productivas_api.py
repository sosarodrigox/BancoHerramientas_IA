from pydantic import BaseModel
from typing import Optional


class UnidadProductivaSinId(BaseModel):
    denominacion_up: str
    antiguedad_emprendimiento_meses: int
    antiguedad_emprendimiento_anios: int
    emprendimiento_formalizado: bool
    emprendimiento_activo: bool
    comercializacion_descripcion: str
    servicios_productos: str
    cantidad_integrantes: int = 0
    # TODO: Verificar valor default de cantidad de integrantes

    class Config:
        orm_mode = True


class UnidadProductiva(UnidadProductivaSinId):
    id: int
