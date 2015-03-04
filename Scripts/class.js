/** 
 * @function Class
 * @constructor
 *
 * Class creator
 * 
 * @param prototype {Object} The prototype object
 *
 * @returns {Function} constructor
**/
function Class( prototype ) {
   prototype         = prototype || {};
   var constructor   = prototype.initialize || function () {};
   constructor.prototype = prototype;
   constructor.prototype.constructor = constructor;
   return constructor;
}