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