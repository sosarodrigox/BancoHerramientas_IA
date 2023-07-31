# from sqlalchemy import Column, Integer, ForeignKey, String
# from sqlalchemy.orm import relationship
# from database import BaseBd


# class CooperativaBd(BaseBd):
#     __tablename__ = 'cooperativas'
#     id = Column(Integer, primary_key=True)
#     nombre_cooperativa = Column(String(100), nullable=False)
#     presidente_id = Column(Integer, ForeignKey(
#         'personas.id', ondelete='SET NULL'), unique=True)
#     secretario_id = Column(Integer, ForeignKey(
#         'personas.id', ondelete='SET NULL'), unique=True)
#     tesorero_id = Column(Integer, ForeignKey(
#         'personas.id', ondelete='SET NULL'), unique=True)

#     presidente = relationship(
#         "PersonaBd", back_populates='cooperativa_presidente', foreign_keys=[presidente_id])
#     secretario = relationship(
#         "PersonaBd", back_populates='cooperativa_secretario', foreign_keys=[secretario_id])
#     tesorero = relationship(
#         "PersonaBd", back_populates='cooperativa_tesorero', foreign_keys=[tesorero_id])
#     asociados = relationship(
#         "PersonaBd", back_populates='cooperativa_asociado')
