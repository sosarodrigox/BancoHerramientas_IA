from models.unidades_productivas.emprendedores_api import EmprendedorSinId
from models.unidades_productivas.emprendedores_bd import EmprendedorBd
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select

# HardCode para probar la API sin buscar datos de la BD.


class EmprendedoresRepository():

    def get_all(self, db: Session):
        return db.execute(select(EmprendedorBd).order_by(EmprendedorBd.persona_id)).scalars().all()

    def get_by_id(self, id: int, db: Session):
        return db.execute(select(EmprendedorBd).filter(EmprendedorBd.id == id)).scalars().first()

    def create(self, emprendedor: EmprendedorSinId, db: Session):
        nueva_entidad_bd: EmprendedorBd = EmprendedorBd(**emprendedor.dict())
        db.add(nueva_entidad_bd)
        db.commit()
        return nueva_entidad_bd
