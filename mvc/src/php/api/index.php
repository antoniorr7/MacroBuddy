<?php
    // Cargamos la configuración
    $config = require_once('config.php');

    if ($config['debug']) {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
    }

    try {
        // Inyección de dependencias
        require_once('./services/bd.php');
        BD::$bd = $config['bd'];
        BD::$host = $config['host_bd'];
        BD::$usuario = $config['usuario_bd'];
        BD::$clave = $config['clave_bd'];
        

        // Procesamos la petición para identificar el recurso solicitado y sus parámetros
        $metodo = $_SERVER['REQUEST_METHOD'];
        $pathParams = explode('/', $_SERVER['PATH_INFO']);
        $queryParams = [];
        parse_str($_SERVER['QUERY_STRING'], $queryParams);
        $recurso = $pathParams[1];  // El primer elemento es la /.
        array_splice($pathParams, 0, 2);    // Quitamos la / y el recurso solicitado.

        // Procesamos los nulos
        for ($i=0; $i<count($pathParams); $i++) {
            if ($pathParams[$i] == 'null')
                $pathParams[$i] = null;
        }

        $body = json_decode(file_get_contents('php://input'));

        // // Autenticación
        // $usuario = null;
        // require_once('./controllers/login.php');
        // require_once('./controllers/logingoogle.php');

        // // Inyección de dependencias
        // Login::$clave = $config['clave_encriptacion'];
        // Login::$algoritmo_encriptacion = $config['algoritmo_encriptacion'];
        // LoginGoogle::$clave = $config['clave_encriptacion'];
        // LoginGoogle::$algoritmo_encriptacion = $config['algoritmo_encriptacion'];

        // // Utilizamos Authorization2 en lugar de Authorization por un bug de NGINX que no transmite esa cabecera
        // if (array_key_exists('Authorization2', apache_request_headers())) {
        //     $autorizacion = apache_request_headers()['Authorization2'];

        //     if ($autorizacion != "null")
        //         $usuario = json_decode(Login::desencriptar($autorizacion));
        // }

        // // Logging
        // if ($config['log']) {
        //     require_once('./services/log.php');
        //     Log::registrar($usuario, $recurso, $metodo, $pathParams, $queryParams, $body);
        // }

        // Routing
        $controlador = false;
        switch ($recurso) {
            
            case 'usuarios':
            require_once('./controller/usuarios.php');
            $controlador = new Usuarios();
            break;

            default:
                header('HTTP/1.1 501 Not Implemented');
                die();
        }
        if ($controlador) {
					switch($metodo) {
							case 'GET':
									$controlador->get($pathParams, $queryParams, $body);
									die();

							case 'POST':
									$controlador->post($pathParams, $queryParams, $body);
									die();

							case 'DELETE':
									$controlador->delete($pathParams, $queryParams, $usuario);
									die();

							case 'PUT':
									$controlador->put($pathParams, $queryParams, $body, $usuario);
									die();

							default:
									header('HTTP/1.1 501 Not Implemented');
									die();
					}
        }
        else {
            header('HTTP/1.1 501 Not Implemented');
            die();
        }
    }
    catch (Throwable $excepcion) { // Throwable (interfaz) incluye Error y Exception
        switch ($excepcion->getCode()) {
            case 2002:      // No hay conexión BBDD.
                header('HTTP/1.1 408 Request Timeout');
                break;

            case 23000:     // Integrity constraint violation: 1062
                header('HTTP/1.1 500 Internal Server Error 1');
                break;

            default:
                header('HTTP/1.1 500 Internal Server Error');
                break;
        }

        echo $excepcion;
        die();
    }

    