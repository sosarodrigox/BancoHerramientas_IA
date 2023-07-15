from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from database import BaseBd


class PersonaBd(BaseBd):
    __tablename__ = 'personas'
    id = Column(Integer, primary_key=True)
    apellido = Column(String(50), nullable=False)
    nombre = Column(String(50), nullable=False)
    cuil = Column(String(11), nullable=False, unique=True)
    genero = Column(String(50), nullable=False)
    fecha_nacimiento = Column(DateTime, nullable=False)
    nivel_educativo = Column(String(50), nullable=False)
    titulo_prof = Column(String(50), default="NO POSEE")
    situacion_laboral = Column(String(20), nullable=False)
    saberes_experiencia = Column(String(2), nullable=False, default="NO")
    curso_formacion_prof = Column(String(2), nullable=False, default="NO")
    # TODO: Relacion con la tabla ubicaciones
