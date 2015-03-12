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

/**
 * @function rgbToHex
 * 
 * Converts valid rgb values to hex, otherwise returns same input
 * 
 * @param  {String} color String color in rgb format
 * 
 * @returns {String} String color in hex format
 */
function rgbToHex( color ) {
   if ( color.indexOf('rgb') !== 0 ) {
      return color;
   }
   
   var rgb = color.substring( color.indexOf('(') + 1, color.indexOf(')') )
         .split(' ').join('')
         .split(',');
   
   var hex = '#';
   for ( var i=0; i<3; i += 1 ) {
      var value = Number(rgb[i]).toString( 16 );
      hex += value.length == 1 ? '0' + value : value;
   }
   return hex;
}

/**
 * @function colorToHex
 * 
 * Converts valid color names to hex, otherwise returns same input
 * 
 * @param  {String} color String color name ("red", "green", "cyan", etc.)
 * 
 * @returns {String} String color in hex format
 */
function colorToHex( color ) {
   return ({
      "aliceblue": "#f0f8ff",
      "antiquewhite": "#faebd7",
      "aqua": "#00ffff",
      "aquamarine": "#7fffd4",
      "azure": "#f0ffff",
      "beige": "#f5f5dc",
      "bisque": "#ffe4c4",
      "black": "#000000",
      "blanchedalmond": "#ffebcd",
      "blue": "#0000ff",
      "blueviolet": "#8a2be2",
      "brown": "#a52a2a",
      "burlywood": "#deb887",
      "cadetblue": "#5f9ea0",
      "chartreuse": "#7fff00",
      "chocolate": "#d2691e",
      "coral": "#ff7f50",
      "cornflowerblue": "#6495ed",
      "cornsilk": "#fff8dc",
      "crimson": "#dc143c",
      "cyan": "#00ffff",
      "darkblue": "#00008b",
      "darkcyan": "#008b8b",
      "darkgoldenrod": "#b8860b",
      "darkgray": "#a9a9a9",
      "darkgreen": "#006400",
      "darkkhaki": "#bdb76b",
      "darkmagenta": "#8b008b",
      "darkolivegreen": "#556b2f",
      "darkorange": "#ff8c00",
      "darkorchid": "#9932cc",
      "darkred": "#8b0000",
      "darksalmon": "#e9967a",
      "darkseagreen": "#8fbc8f",
      "darkslateblue": "#483d8b",
      "darkslategray": "#2f4f4f",
      "darkturquoise": "#00ced1",
      "darkviolet": "#9400d3",
      "deeppink": "#ff1493",
      "deepskyblue": "#00bfff",
      "dimgray": "#696969",
      "dodgerblue": "#1e90ff",
      "firebrick": "#b22222",
      "floralwhite": "#fffaf0",
      "forestgreen": "#228b22",
      "fuchsia": "#ff00ff",
      "gainsboro": "#dcdcdc",
      "ghostwhite": "#f8f8ff",
      "gold": "#ffd700",
      "goldenrod": "#daa520",
      "gray": "#808080",
      "green": "#008000",
      "greenyellow": "#adff2f",
      "honeydew": "#f0fff0",
      "hotpink": "#ff69b4",
      "indianred ": "#cd5c5c",
      "indigo": "#4b0082",
      "ivory": "#fffff0",
      "khaki": "#f0e68c",
      "lavender": "#e6e6fa",
      "lavenderblush": "#fff0f5",
      "lawngreen": "#7cfc00",
      "lemonchiffon": "#fffacd",
      "lightblue": "#add8e6",
      "lightcoral": "#f08080",
      "lightcyan": "#e0ffff",
      "lightgoldenrodyellow": "#fafad2",
      "lightgrey": "#d3d3d3",
      "lightgreen": "#90ee90",
      "lightpink": "#ffb6c1",
      "lightsalmon": "#ffa07a",
      "lightseagreen": "#20b2aa",
      "lightskyblue": "#87cefa",
      "lightslategray": "#778899",
      "lightsteelblue": "#b0c4de",
      "lightyellow": "#ffffe0",
      "lime": "#00ff00",
      "limegreen": "#32cd32",
      "linen": "#faf0e6",
      "magenta": "#ff00ff",
      "maroon": "#800000",
      "mediumaquamarine": "#66cdaa",
      "mediumblue": "#0000cd",
      "mediumorchid": "#ba55d3",
      "mediumpurple": "#9370d8",
      "mediumseagreen": "#3cb371",
      "mediumslateblue": "#7b68ee",
      "mediumspringgreen": "#00fa9a",
      "mediumturquoise": "#48d1cc",
      "mediumvioletred": "#c71585",
      "midnightblue": "#191970",
      "mintcream": "#f5fffa",
      "mistyrose": "#ffe4e1",
      "moccasin": "#ffe4b5",
      "navajowhite": "#ffdead",
      "navy": "#000080",
      "oldlace": "#fdf5e6",
      "olive": "#808000",
      "olivedrab": "#6b8e23",
      "orange": "#ffa500",
      "orangered": "#ff4500",
      "orchid": "#da70d6",
      "palegoldenrod": "#eee8aa",
      "palegreen": "#98fb98",
      "paleturquoise": "#afeeee",
      "palevioletred": "#d87093",
      "papayawhip": "#ffefd5",
      "peachpuff": "#ffdab9",
      "peru": "#cd853f",
      "pink": "#ffc0cb",
      "plum": "#dda0dd",
      "powderblue": "#b0e0e6",
      "purple": "#800080",
      "red": "#ff0000",
      "rosybrown": "#bc8f8f",
      "royalblue": "#4169e1",
      "saddlebrown": "#8b4513",
      "salmon": "#fa8072",
      "sandybrown": "#f4a460",
      "seagreen": "#2e8b57",
      "seashell": "#fff5ee",
      "sienna": "#a0522d",
      "silver": "#c0c0c0",
      "skyblue": "#87ceeb",
      "slateblue": "#6a5acd",
      "slategray": "#708090",
      "snow": "#fffafa",
      "springgreen": "#00ff7f",
      "steelblue": "#4682b4",
      "tan": "#d2b48c",
      "teal": "#008080",
      "thistle": "#d8bfd8",
      "tomato": "#ff6347",
      "turquoise": "#40e0d0",
      "violet": "#ee82ee",
      "wheat": "#f5deb3",
      "white": "#ffffff",
      "whitesmoke": "#f5f5f5",
      "yellow": "#ffff00",
      "yellowgreen": "#9acd32"
   })[ color ] || color;
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

/**
 * Array.prototype.forEach
 *
 * Loops an array and executes a callback function for every element of the array
 *
 * @param callback   {Function}  The callback function to be executed
 * @param context    {Object}    The callback context (represented by `this`)
 *
 * @returns {Array} The same array
**/
! Array.prototype.forEach && (Array.prototype.forEach = function ( callback, context ) {
   // `this` is our array
   // perform a standard for loop
   for ( var i=0, l=this.length; i<l; i += 1 ) {
      // For every element of the array, call the `callback` fn applying the `context`,
      // and pass the element, index, and the array itself as arguments.
      callback.call( context, this[i], i, this );
   }
   return this;   // enable chaining
});

/**
 * Array.prototype.filter
 *
 * Loops an array and executes a callback filter function for every element of the array
 * Returns new array with filtered elements
 * The callback fn must return truthy value if we want the element in the new array
 *
 * @param callback   {Function}  The callback function to be executed
 * @param context    {Object}    The callback context (represented by `this`)
 *
 * @returns {Array} The same array
**/
! Array.prototype.filter && (Array.prototype.filter = function ( callback, context ) {
   var filtered_arr = [];  // our new filtered array
   // `this` is our array
   // perform a standard for loop
   for ( var i=0, l=this.length; i<l; i += 1 ) {
      // For every element of the array, call the `callback` fn applying the `context`,
      // and pass the element, index, and the array itself as arguments.
      // Push the element into the filtered array if the `callback` returns truthy value.
      callback.call( context, this[i], i, this ) && filtered_arr.push( this[i] );
   }
   return filtered_arr; // the new filtered array
});

/**
 * Array.prototype.indexOf
 *
 * Returns first index of an element (if exists) inside the array, otherwise returns -1
 *
 * @param item {Mixed}  The element we're searching for
 *
 * @returns {Number}
**/
! Array.prototype.indexOf && (Array.prototype.indexOf = function ( item ) {
   for ( var i=0, l=this.length; i<l; i += 1 ) {
      if ( item === this[i] ) {
         return i;
      }
   }
   return -1;
});

/**
 * Array.prototype.lastIndexOf
 *
 * Returns last index of an element (if exists) inside the array, otherwise returns -1
 *
 * @param item {Mixed}  The element we're searching for
 *
 * @returns {Number}
**/
! Array.prototype.lastIndexOf && (Array.prototype.lastIndexOf = function ( item ) {
   for ( var i=this.length-1; i>=0; i -= 1 ) {
      if ( item === this[i] ) {
         return i;
      }
   }
   return -1;
});