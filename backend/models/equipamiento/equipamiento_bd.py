from sqlalchemy import Column, Enum, Integer, String, Float
from database import BaseBd


class EquipamientoBd(BaseBd):
    __tablename__ = "equipamiento"
    id = Column(Integer, primary_key=True)
    tipo = Column(Enum('maquina', 'herramienta', 'insumo',
                  name='tipo_enum'), nullable=False)
    descripcion_principal = Column(String(100), nullable=False)
    descripcion_secundaria = Column(String(100), nullable=True)
    potencia_valor = Column(Float, nullable=True)
    potencia_unidad = Column(String(50), nullable=True)
    valor = Column(Float, nullable=True, nullable=False, default=0.0)
