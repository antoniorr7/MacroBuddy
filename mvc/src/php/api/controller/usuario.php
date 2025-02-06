<?php
    require_once(dirname(__DIR__) . '/daos/daousuario.php');

    /**
     * Controlador de registro de usuarios.
     */
    class Usuario {
        /**
         * Inserta fila a la tabla usuario.
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $datos Datos del usuario.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function post($pathParams, $queryParams, $datos, $usuario) {
            // Insertar en tabla de usuarios.
            try {
                $id = DAOUsuario::altaUsuario($datos);
            } catch (Exception $e) {
                if (strpos($e->getMessage(), 'UQ_correoUsuario'))
                    header('HTTP/1.1 400 Bad Request - Email repetido');
                else if (strpos($e->getMessage(), 'UQ_dniUsuario'))
                    header('HTTP/1.1 400 Bad Request - DNI repetido');
                else
                    header('HTTP/1.1 400 Bad Request');
                die();
            }

            header('Content-type: application/json; charset=utf-8');
            header('HTTP/1.1 200 OK');
            echo json_encode($id);
            die();
        }

        /**
         * Actualiza fila tabla usuario.
         * @param array $pathParams No utilizado.
         * @param array $queryParams No utilizado.
         * @param object $datos Datos del usuario.
         * @param object $usuario Usuario que realiza el proceso.
         */
        function put($pathParams, $queryParams, $datos, $usuario) {
            DAOUsuario::modificarUsuario($datos);
            sleep(1);
            header('HTTP/1.1 200 OK');
            die();
        }

        /**
         * Obtiene usuarios de la tabla usuario.
         * @param array $pathParams No utilizado.
         * @param array $queryParams Parámetros de consulta.
         * @param object $datos No utilizado.
       
         */
        function get($pathParams, $queryParams, $datos) {
            try {
                $usuarios = DAOUsuario::obtenerUsuarios($queryParams);
                header('Content-type: application/json; charset=utf-8');
                header('HTTP/1.1 200 OK');
                echo json_encode($usuarios);
            } catch (Exception $e) {
                header('HTTP/1.1 500 Internal Server Error');
                die();
            }
            die();
        }
    }
?>
