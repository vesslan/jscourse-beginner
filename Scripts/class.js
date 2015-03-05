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
function Class( new_prototype ) {
   new_prototype     = new_prototype || {};
   var parent_proto  = typeof new_prototype.Extends == 'function' ? new_prototype.Extends.prototype : {};
   // create our constructor - use provided `initialize`
   // method or create empty function
   var constructor   = function () {
      // get the constructor function
      var fn               = (new_prototype.initialize || parent_proto.initialize || function () {});
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
   constructor.prototype = extend( {}, parent_proto, new_prototype );
   // set name to all annonymous functions
   for ( var name in constructor.prototype ) {
      if ( typeof( constructor.prototype[ name ] ) == 'function' ) {
         // set the same name as the key
         constructor.prototype[ name ].__name__ = name;
      }
   }
   // make parent method calling available via `this.parent()`
   constructor.prototype.parent = function () {
      var method_name = arguments.callee.caller.__name__;
      var fn = parent_proto[ method_name ];
      if ( typeof fn !== 'function' ) {
         throw new Error('Parent method ' + method_name + ' is not defined!');
      }
      return fn.apply( this, arguments );
   }
   return constructor;
}