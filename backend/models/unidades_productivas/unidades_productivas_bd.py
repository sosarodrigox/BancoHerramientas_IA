from sqlalchemy import Column, Boolean, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import BaseBd


class UnidadProductivaBd(BaseBd):
    __tablename__ = 'unidades_productivas'
    id = Column(Integer, primary_key=True)
    denominacion_up = Column(String(250), nullable=False)
    antiguedad_emprendimiento_meses = Column(Integer, nullable=False)
    antiguedad_emprendimiento_anios = Column(Integer, nullable=False)
    emprendimiento_formalizado = Column(Boolean, nullable=False)
    emprendimiento_activo = Column(Boolean, nullable=False)
    comercializacion_descripcion = Column(String(1024), nullable=False)
    servicios_productos = Column(String(1024), nullable=False)
    cantidad_integrantes = Column(Integer, default=0)

    persona_id = Column(Integer, ForeignKey('personas.id'))
    persona = relationship("PersonaBd", back_populates="unidades_productivas")
