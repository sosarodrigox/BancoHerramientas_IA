from datetime import date
from models.unidades_productivas.emprendedores_bd import EmprendedorBd
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select

# HardCode para probar la API sin buscar datos de la BD.


class EmprendedoresRepository():

    def get_all(self, db: Session):
        return db.execute(select(EmprendedorBd).order_by(EmprendedorBd.apellido)).scalars().all()

    def get_by_id(self, id: int, db: Session):
        return db.execute(select(EmprendedorBd).filter(EmprendedorBd.id == id)).scalars().first()

    def create(self, emprendedor: EmprendedorBd, db: Session):
        nuevo_emprendedor_bd: EmprendedorBd = EmprendedorBd(
            **emprendedor.dict())
        db.add(nuevo_emprendedor_bd)
        db.commit()
        return nuevo_emprendedor_bd
