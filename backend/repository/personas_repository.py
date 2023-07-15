from models.personas.personas_bd import PersonaBd
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select


class PersonasRepository():

    def get_all(self, db: Session):
        return db.execute(select(PersonaBd).order_by(PersonaBd.apellido)).scalars().all()

    def get_by_id(self, id: int, db: Session):
        return db.execute(select(PersonaBd).filter(PersonaBd.id == id)).scalars().first()

    def create(self, persona: PersonaBd, db: Session):
        nueva_persona_bd: PersonaBd = PersonaBd(
            **persona.dict())
        db.add(nueva_persona_bd)
        db.commit()
        return nueva_persona_bd
