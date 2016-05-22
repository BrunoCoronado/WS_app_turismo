DELIMITER $$

CREATE
    /*[DEFINER = { user | CURRENT_USER }]*/
    PROCEDURE `db_turismo`.`sp_autenticarUsuario`(IN _correo VARCHAR(128), IN _pass VARCHAR(128))
    /*LANGUAGE SQL
    | [NOT] DETERMINISTIC
    | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
    | SQL SECURITY { DEFINER | INVOKER }
    | COMMENT 'string'*/
    BEGIN
	SELECT * FROM usuarios WHERE(usuarios.correo = _correo AND usuarios.password = _pass);
    END$$

DELIMITER ;