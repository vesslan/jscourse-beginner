/** 
 * @function typeOf
 *
 * Accepts mixed content & returns the correct type.
 *
 * @param variable {Mixed}
 *
 * @returns {String}
**/
function typeOf( variable ) {
   var type = typeof variable;
   switch ( type ) {
   case 'object':
      return !variable ? 'null' : variable.constructor.name.toLowerCase();
   case 'number':
      return isNaN( variable ) ? 'NaN' : 'number';
   }
   return type;
}

/** 
 * @function toArray
 *
 * Accepts mixed parameters and transforms them into Array.
 *
 * @param mixed {Mixed}
 *
 * @returns {Array}
**/
function toArray( mixed ) {
   if ( mixed.length || mixed.length === 0 ) {
      var arr = [];
      for ( var i=0, l=mixed.length; i<l; i += 1 ) {
         arr[i] = mixed[i];
      }
      return arr;
   }
   return [ mixed ];
}

/** 
 * @function extend
 * 
 * Extends one object with properties of other objects
 *
 * @param obj {Object} The object to extend
 *
 * @returns {Object} The extended object
**/
function extend( obj ) {
   for ( var i=1, l=arguments.length; i<l; i += 1 ) {
      for ( var name in arguments[i] ) {
         if ( arguments[i].hasOwnProperty( name ) ) {
            obj[ name ] = arguments[i][ name ];
         }
      }
   }
   return obj;
}

/*--------------------------------------------------------------- MISSING API */

/**
 * Function.prototype.bind
 *
 * Creates new function and on execution calls that function, changing the context
 * and passing some arguments.
 *
 * @param context {Object} The new function context (represented by `this`)
 * @param argN    {Mixed}  Arguments that will be "hard-coded" in the new function
 *
 * @returns {Function}
**/
! Function.prototype.bind && (Function.prototype.bind = function ( obj ) {
   var args = toArray( arguments );       // transform `arguments` into real array
   var fn   = this;                       // `fn` is the source function
   
   // Create new function that calls our original function, applying 
   // `obj` as context and binding the remaining parameters.
   return function () {
      // On execution, we call the source `fn` function with `obj` as context.
      // We also concatinate the bound `args` with passed `arguments`.
      return fn.apply( obj, args.concat.apply( args, arguments ) );
   }
});