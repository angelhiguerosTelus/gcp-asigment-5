

## CREAR INSTANCIA CLOUD SQL
```sh
# Habilitar los sevicios de sql en el proyecto
gcloud services enable sqladmin.googleapis.com
# Crear una intancia de Cloud SQL con MySQL
gcloud sql instances create gcp5  --database-version=MYSQL_8_0_28 --region=us-central1
# Asignar una contraseña 
gcloud sql users set-password root --host=% --instance gcp5 --password telus2022
# Conectarse a la instancia
gcloud sql connect gcp5 --user=root

```

# SQL QUERY
```sh
# Creacion de la base de datos
CREATE DATABASE assigment;

USE assigment;
CREATE TABLE users(
    idUser int AUTO_INCREMENT primary key,
    name varchar(50),
    email varchar(100)
);

CREATE TABLE photos(
    idPhoto int AUTO_INCREMENT  primary key,
    idUser int,
    idAlbum int,
    photo varchar(200)
);

CREATE TABLE albums(
    idAlbum int AUTO_INCREMENT  primary key,
    name varchar(200)
);

```
# CREACION DE CLOUD FUNCTION
```sh
# Crear función
mkdir gcf_sql
cd gcf_sql/
nano index.js
nano package.json

# Obtener la cadena de conexion a cloud sql
gcloud sql instances describe gcp5 | grep connectionName | awk {'print $2'}

# Desplegar la funcion
gcloud functions deploy getUsers --runtime nodejs10 --trigger-http

# Obtener la url de la funcion
gcloud functions describe getUsers | grep url | awk {'print $2'}
```


# CLOUD FUNCTION
```js
var mysql = require("mysql");

# Datos de la conexión
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "35.222.32.177",
  user: "root",
  password: "root",
  database: "assigment",
});

# Verificar conexión
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});

# Crear función
exports.getUsers = (req, res) => {

  # Obtener todos los usarios
  pool.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      res.status(200).send(result);
      throw new Error(err);
    }

    res.status(200).send(result);
    console.log(result);
  });
};

```