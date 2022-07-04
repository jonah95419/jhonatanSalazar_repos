# Jhonatan Salazar - Repo
## Indicaciones Generales
* NodeJS con Typescript
* Base de Datos CockroachDB
* ORM TypesORM

 ## Instalación
 ```bash
 #Instalar todas las dependencias listadas en el archivo package.json

nvm use v14.7.0 //version de node
npm install
```
 ## Primeros Pasos
  ```bash
#Generar las interfaces del proyecto
npm run tsc:interface

#Levantar el servidor en local
npm run server
```

 ## Servicios REST - Postman
 Para ver la funcionalidad de cada uno de los ejercios se lista varios casos de uso.

  ## Organization
  ```bash
  # POST - Crear nueva Organizacion
  # http://localhost:8000/api/organization
    {
        "name": "Banco Pichincha",
        "status": 1
    }

  # GET - Listar Organizaciones
  # http://localhost:8000/api/organization  

  # PUT - Actualizar Organizacion
  # http://localhost:8000/api/organization
    {
        "id_organization": 4,
        "name": "Banco Pichincha",
        "status": 2
    }

  # DELETE - Eliminar Organizacion
  # http://localhost:8000/api/organization/:id_organization
```

  ## Tribe
  ```bash
  # POST - Crear nueva Tribu
  # http://localhost:8000/api/tribe
    {
        "id_organization": 1,
        "name": "Centro Digital",
        "status": 1
    }

  # GET - Lista la Tribu por id
  # http://localhost:8000/api/tribe/:id_tribe 
```

  ## Repository
  ```bash
  # POST - Crear nuevo Repositorio 
  # http://localhost:8000/api/repository
    {
        "id_tribe": 1,
        "name": "cd-common-text",
        "state": "E",
        "status": "I"
    }

  # GET - Listar Repositorios por Id de la tribu
  # http://localhost:8000/api/repository/:id_tribe

  # GET - Generar Archivo CSV cuando cumple las condiciones
  # http://localhost:8000/api/repository/report/:id_tribe
```

  ## Metrics
  ```bash
  # POST - Crear nueva Metrica
  # http://localhost:8000/api/metrics
    {
        "id_repository": 4,
        "coverage": 85,
        "bugs": 1,
        "vulnerabilities": 1,
        "hotspot": 1,
        "code_smells": 1
    }

  # GET - Listar Metricas
  # http://localhost:8000/api/metrics
```

## Nota
Se crearon los Servicios necesarios para todas las entidades para contar con los datos necesarios para cumplir con los ejercicios.

Teniendo como resultado, la relacion entre las entidades dejando Entidad informativa a Repository.

![alt text](https://firebasestorage.googleapis.com/v0/b/todo-yo.appspot.com/o/Screen%20Shot%202022-07-03%20at%208.18.20%20PM.png?alt=media&token=5e1947a8-a017-4a5a-b0c0-f064224b94b5g)

Tener presente, el middleware que está colocado en algunos de los servicios controla que los datos de entrada sean exactamente los que se indica, asi mismo como el tipado de cada parametro.

## Enlaces
[POSTAMN](https://www.getpostman.com/collections/cda38bb6f8dcbd884b1f)

[MOCK SERVICE](http://demo9839251.mockable.io/repositories/state)


 
