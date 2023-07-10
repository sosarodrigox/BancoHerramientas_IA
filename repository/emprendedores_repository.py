from datetime import date
from models.unidades_productivas.emprendedores_api import Emprendedor

# HardCode para probar la API sin buscar datos de la BD.


class EmprendedoresRepository():

    def get_all(self):
        return [
            Emprendedor(
                id=1,
                apellido='Perez',
                nombre='Juan',
                cuil='20-12345678-9',
                genero='Masculino',
                fecha_nacimiento=date(1990, 1, 1),
                nivel_educativo='Secundario',
                titulo_prof=None,
                situacion_laboral='Desocupado',
                saberes_experiencia='NO',
                curso_formacion_prof='NO'),
            Emprendedor(
                id=2,
                apellido='Gonzalez',
                nombre='Maria',
                cuil='27-12345678-9',
                genero='Femenino',
                fecha_nacimiento=date(1990, 1, 1),
                nivel_educativo='Secundario',
                titulo_prof='Técnico Radiólogo',
                situacion_laboral='Desocupado',
                saberes_experiencia='SI',
                curso_formacion_prof='NO')
        ]
