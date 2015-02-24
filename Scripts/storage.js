// create anonymous self-executing function in order to protect our data
(function () {
   var data = {}; // this is our protected data
   // define the global `storage` object
   storage = {
      /** 
       * @method get
       * Returns the value of the `key` parameter if present
       * 
       * @param {String} key
       * 
       * @returns {Mixed} value of the stored key
       */
      get : function ( key ) {
         return data[ key ];
      },
      
      /** 
       * @method set
       * Sets the `value` to the `key` parameter in the `data`
       * 
       * @param {String} key
       * @param {Mixed} value
       */
      set : function ( key, value ) {
         if ( ! data[ key ] ) {
            data[ key ] = value;
         } else {
            console.warn('Cheating, eh?');
         }
      },
      
      /** 
       * @method getMultiple
       * Like `get` method, but returns array of values
       * 
       * @param {Array} keys
       * 
       * @returns {Array} values of the stored keys (if present)
       */
      getMultiple : function ( keys ) {
         var values = [];
         for ( var i=0, l=keys.length; i<l; i++ ) {
            values.push( data[ keys[i] ] );
         }
         return values;
      },
      
      /** 
       * @method setMultiple
       * Like `set` method, but for each pair of `pairs`
       * 
       * @param {Object} pairs
       */
      setMultiple : function ( pairs ) {
         for ( var key in pairs ) {
            if ( pairs.hasOwnProperty( key ) && pairs[ key ] ) {
               data[ key ] = pairs[ key ];
            }
         }
      }
   }
})();