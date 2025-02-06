<?php
require_once (dirname(__DIR__) . '/models/usuario.php');

/**
 * DAO de Usuario.
 * Objeto para el acceso a los datos relacionados con usuarios.
 */
class DAOUsuario
{
    /**
     * Consulta la base de datos para obtener el usuario por ID.
     * @param int $id ID del usuario.
     * @return object|boolean Devuelve los datos del usuario o false si no existe el usuario. 
     */
    public static function osbtenerUsuarios()
    {
        $sql = 'SELECT id, nombre FROM usuarios';
        $params = array('id' => $id);
        $resultado = BD::seleccionar($sql, $params);

        return DAOUsuario::crearUsuario($resultado);
    }

    /**
     * Genera un objeto de tipo usuario.
     * @param array $resultSet Array de datos.
     * @return Usuario|boolean Objeto creado o False si no se pudo crear.
     */
    public static function crearUsuario($resultSet)
    {
        $usuario = new Usuario();

        if (count($resultSet) == 1) {
            $usuario->id = $resultSet[0]['id'];
            $usuario->nombre = $resultSet[0]['nombre'];
        } else {
            $usuario = false;
        }

        return $usuario;
    }
}
