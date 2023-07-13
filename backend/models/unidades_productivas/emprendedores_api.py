from datetime import date
from pydantic import BaseModel


class EmprendedorSinId(BaseModel):
    apellido: str
    nombre: str
    cuil: str
    genero: str
    fecha_nacimiento: date
    nivel_educativo: str
    titulo_prof: str = None
    situacion_laboral: str
    saberes_experiencia: str
    curso_formacion_prof: str

    class Config:
        orm_mode = True


class Emprendedor(EmprendedorSinId):
    id: int
