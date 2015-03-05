/** 
 * @function Class
 * @constructor
 *
 * Class creator
 * 
 * @requires @function extend
 * 
 * @param prototype {Object} The prototype object
 *
 * @returns {Function} constructor
**/
function Class( prototype ) {
   prototype         = prototype || {};
   var parent        = typeof prototype.Extends == 'function' ? prototype.Extends.prototype : {};
   // create our constructor - use provided `initialize`
   // method or create empty function
   var constructor   = function () {
      // get the constructor function
      var fn               = (prototype.initialize || parent.initialize || function () {});
      // create empty function that we will use for the real constructor
      var Instance         = function () {};
      // link prototypes
      Instance.prototype   = constructor.prototype;
      // create the new instance; `instance` will inherit the `constructor` prototype
      var instance         = new Instance();
      // execute the constructor function, changing the context with the `instance`
      var return_val       = fn.apply( instance, arguments );
      // In case the return result of the constructor fn is object, return this object.
      // Otherwise return the `instance`.
      return typeof( return_val ) == 'object' ? return_val : instance;
   }
   // set the prototype object
   // inherit properties & methods from the parent class
   constructor.prototype = extend( {}, parent, prototype );
   return constructor;
}