/**
  Servicio REST.
  Servicio para interfaz RESTful.
  Ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  Ref: https://restfulapi.net/
  Ref: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
  O callback o devolvemos una promesa (mejor, así se puede controlar el error en local)
**/

export class Rest {
	// Actualizamos la URL base para que apunte a la ubicación deseada
	static #URL = 'http://localhost/MacroBuddy/mvc/src/php/api/index.php';
	static #autorizacion = null;
	
	/**
	  Establece la autorización para las llamadas al servidor.
	  La autorización se envía en la cabecera HTTP Authorization.
	**/
	static setAutorizacion (autorizacion) {
	  Rest.#autorizacion = autorizacion;
	}
	
	/**
	  Realiza una llamada AJAX por GET.
	  @param path {String} Path del recurso solicitado.
	  @param pathParams {Array} Parámetros de path que se añadirán a la llamada.
	  @param queryParams {Map} Mapa de parámetros que se añadirán después del path.
	  @return {Promise} Devuelve una promesa.
	**/
	static get (path, pathParams = [], queryParams) {
	  const opciones = {
		method: 'GET',
		headers: Rest._getHeaders()
	  };
	
	  return fetch(Rest._construirURL(path, pathParams, queryParams), opciones) // Hacemos la petición
		.then(respuesta => {
		  // Control de errores
		  if (!respuesta.ok) throw Error(`${respuesta.status} - ${respuesta.statusText}`);
		  // Comprobamos si es JSON válido
		  const tipo = respuesta.headers.get('content-type');
		  if (tipo && tipo.indexOf('application/json') !== -1) { 
		
			return respuesta.json();
		  }
		  // No es JSON
		
		  return respuesta.text();
		});
	}
	
	/**
	  Realiza una llamada AJAX por POST.
	  @param path {String} Path del recurso solicitado.
	  @param pathParams {Array} Parámetros de path que se añadirán a la llamada.
	  @param requestBody {Object} Objeto que se pasa como parámetro en el body de la llamada.
	  @param json {Boolean} Indica si la respuesta se espera en JSON.
	  @return {Promise} Devuelve una promesa.
	**/
	static post (path, pathParams = [], requestBody = null, json = false) {
	  const opciones = {
		method: 'POST',
		headers: Rest._getHeaders(),
		body: JSON.stringify(requestBody)
	  };
	  
	  return fetch(Rest._construirURL(path, pathParams), opciones)
		.then(respuesta => {
		  if (!respuesta.ok) { throw Error(`${respuesta.status} - ${respuesta.statusText}`); }
		  return json ? respuesta.json() : respuesta.text();
		});
	}
	
	/**
	  Realiza una llamada AJAX por DELETE.
	  @param path {String} Path del recurso solicitado.
	  @param pathParams {Array} Parámetros de path que se añadirán a la llamada.
	  @return {Promise} Devuelve una promesa.
	**/
	static delete (path, pathParams) {
	  const opciones = {
		method: 'DELETE',
		headers: Rest._getHeaders()
	  };
	  return fetch(Rest._construirURL(path, pathParams), opciones)
		.then(respuesta => {
		  if (!respuesta.ok) throw Error(`${respuesta.status} - ${respuesta.statusText}`);
		  return true;
		});
	}
	
	/**
	  Realiza una llamada AJAX por PUT.
	  @param path {String} Nombre del recurso solicitado.
	  @param pathParams {Array} Parámetros de path que se añadirán a la llamada.
	  @param requestBody {Object} Objeto que se pasa como parámetro en la llamada.
	  @param json {Boolean} Indica si la respuesta se espera en JSON.
	  @return {Promise} Devuelve una promesa.
	**/
	static put (path, pathParams = [], requestBody = null, json = false) {
	  const opciones = {
		method: 'PUT',
		headers: Rest._getHeaders(),
		body: JSON.stringify(requestBody)
	  };
	  return fetch(Rest._construirURL(path, pathParams), opciones)
		.then(respuesta => {
		  if (!respuesta.ok) { throw Error(`${respuesta.status} - ${respuesta.statusText}`); }
		  return json ? respuesta.json() : respuesta.text();
		});
	}
	
	// Métodos internos no documentados.
	static _getHeaders () {
	  return {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization2: Rest.#autorizacion
	  };
	}
	
	/**
	  Construye la URL completa para la petición.
	  @param path {String} El recurso que se quiere acceder.
	  @param pathParams {Array} Array de parámetros adicionales para la ruta.
	  @param queryParams {Object|null} Objeto con parámetros de query.
	  @return {String} La URL construida.
	**/
	static _construirURL(path, pathParams = [], queryParams = null) {
	  // Convertir cada parámetro null en la cadena "null"
	  const processedParams = pathParams.map(param => param === null ? 'null' : param);
	  
	  // Construir la URL base concatenando la constante y la ruta
	  let url = `${Rest.#URL}/${path}`;
	  
	  // Si hay parámetros de ruta, se añaden separados por '/'
	  if (processedParams.length > 0 && processedParams.join('') !== '') {
		url += '/' + processedParams.join('/');
	  } else {
		// Si no hay parámetros, asegurar que la URL termine en '/'
		if (!url.endsWith('/')) {
		  url += '/';
		}
	  }
	  
	  // Construir el query string si existen parámetros
	  if (queryParams && typeof queryParams === 'object' && Object.keys(queryParams).length > 0) {
		const queryString = Object.keys(queryParams)
		  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
		  .join('&');
		url += '?' + queryString;
	  }
	  
	  // Codificar la URL completa
	  url = encodeURI(url);
	  console.log(url);
	  return url;
	}
  }
  