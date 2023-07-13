from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:1234@localhost/banco_de_herramientas"

# SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:admin@localhost/instituto"

# Motor de conexión:
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# Sesión para acceder a la conexión con la BD.
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# Clase base para manejar las entidades con el ORM
BaseBd = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_all():
    BaseBd.metadata.create_all(bind=engine)


def drop_all():
    BaseBd.metadata.drop_all(bind=engine)
