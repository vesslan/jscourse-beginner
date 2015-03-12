!window.HTMLElement && (HTMLElement = Element); // IE8

/** 
 * @function getElemsByTag
 * 
 * Returns all matched elements by their tag name
 *
 * @param ancestor   {Element}   element, default `document`
 * @param tag        {String}    tag name, default '*'
 *
 * @returns          {Array}     Elements collection
**/
function getElemsByTag( ancestor, tag ) {
   tag      = tag       || '*';  // get all elements by default
   ancestor = ancestor  || document;
   return toArray( ancestor.getElementsByTagName( tag ) );
}

/** 
 * @function getElemsByClass
 * 
 * Returns all matched elements having class name(s)
 *
 * @param ancestor   {Element}   element, default `document`
 * @param name       {String}    class name(s)
 *
 * @returns          {Array}     Elements collection
**/
function getElemsByClass( ancestor, name ) {
   ancestor = ancestor  || document;
   if ( ancestor.getElementsByClassName ) {
      // API natively supported
      return [].slice.call( ancestor.getElementsByClassName( name ) );
   }
   return toArray( getElemsByTag( '*', ancestor ) ).filter( function ( elem ) {
      var classes = name.split(' ');
      for ( var i=0; i<classes.length; i += 1 ) {
         if ( ! classes[i] ) {
            continue;
         }
         if ( elem.className.split(' ').indexOf( classes[i] ) == -1 ) {
            return false;
         }
      }
      return true;
   });
}

/** 
 * @function getPrevious
 * 
 * Returns previous sibling, ignoring white space
 *
 * @param elem {HTMLElement}  The element whose previous sibling we want to get
 *
 * @returns {HTMLElement}
**/
function getPrevious( elem ) {
   do {
      elem = elem.previousSibling;
   } while ( elem && ! elem.tagName );
   return elem;
}

/** 
 * @function getNext
 * 
 * Returns next sibling, ignoring white space
 *
 * @param elem {HTMLElement}  The element whose next sibling we want to get
 *
 * @returns {HTMLElement}
**/
function getNext( elem ) {
   do {
      elem = elem.nextSibling;
   } while ( elem && ! elem.tagName );
   return elem;
}

/** 
 * @function getChildren
 * 
 * Returns element's children, ignoring white space
 *
 * @param elem {HTMLElement}  The element whose children (HTML elements) we want to get
 *
 * @returns {Array}
**/
function getChildren( elem ) {
   var children = [].slice.call( elem.childNodes );
   return children.filter( function ( child ) {
      return !! child.tagName;
   });
}

/** 
 * @function getAttributes
 * 
 * Returns attributes' values by given attribute names (Array)
 * 
 * @param  {HTMLElement}   elem  HTML Element whose attributes' values we want
 * @param  {Array}         attrs Array of attribute names
 * 
 * @returns {Array}  Attributes' values
 */
function getAttributes( elem, attrs ) {
   var values = [];   // here we keep attribute values
   for ( var i=0, l=attrs.length; i<l; i += 1 ) {
      values.push( elem.getAttribute( attrs[i] ) );
   }
   return values;
}

/** 
 * @function setAttributes
 * 
 * Sets multiple attributes' values
 * 
 * @param {HTMLElement} elem  HTML Element whose attributes' values we want to set
 * @param {Object}      pairs Hash - attribute_name:attribute_value pairs
 */
function setAttributes( elem, pairs ) {
   for ( var name in pairs ) {
      if ( pairs.hasOwnProperty( name ) ) {
         elem.setAttribute( name, pairs[ name ] );
      }
   }
}

/** 
 * @function inject
 * 
 * Injects element related to another element in the DOM
 *
 * @param elem       {HTMLElement}  The element we want to inject
 * @param relative   {HTMLElement}  The element relative to which we want to place our element
 * @param where      {String}       The position related to the relative element, default "bottom"
**/
function inject( elem, relative, where ) {
   if ( ! elem || ! relative ) {
      throw new Error('`inject` requires `elem` and `relative` params');
   }
   // default position is "bottom"
   if ( ['top', 'before', 'after'].indexOf( where ) < 0 ) {
      where = 'bottom';
   }
   switch ( where ) {
   case 'bottom':
      relative.appendChild( elem );
      break;
   case 'top':
      // try insertBefore firstChild
      var first_child = relative.firstChild;
      first_child && relative.insertBefore( elem, first_child ) ||
            relative.appendChild( elem );
      break;
   case 'before':
      var parent_node = relative.parentNode;
      // we just can't inject before `document`, <html>
      if ( [undefined, document, document.documentElement].indexOf( parent_node ) > -1 ) {
         throw new Error('Cannot `inject` "before"');
      }
      parent_node.insertBefore( elem, relative );
      break;
   case 'after':
      var next_sibling = relative.previousSibling;
      if ( next_sibling ) {
         inject( elem, next_sibling, 'before' );
      } else if ( relative.parentNode ) {
         // appendChild will do here
         relative.parentNode.appendChild( elem );
      } else {
         throw new Error('Cannot `inject` "after"');
      }
   }
}

/** 
 * @function grab
 * 
 * Adopts given element
 *
 * @param elem    {HTMLElement}  The parent element
 * @param child   {HTMLElement}  The element we want to adopt
 * @param where   {String}       The position we want to inject the child, default "bottom"
**/
function grab( elem, child, where ) {
   if ( where !== 'top' ) {
      where = 'bottom';
   }
   inject( child, elem, where );
}

/** 
 * @function wrap
 * 
 * Injects element next to a specified element and then adopts that element
 *
 * @param elem    {HTMLElement}  The parent element
 * @param child   {HTMLElement}  The element we want to adopt
 * @param where   {String}       The position we want to inject the child, default "bottom"
**/
function wrap( elem, child, where ) {
   // first `inject` the `elem` next to the `child`
   inject( elem, child, 'before' );
   // then grab the `child`
   grab( elem, child, where );
}

// Adding these methods to HTMLElement.prototype
[
   'getElemsByTag',
   'getElemsByClass',
   'getPrevious',
   'getNext',
   'getChildren',
   'getAttributes',
   'setAttributes',
   'inject',
   'grab',
   'wrap'
].forEach( function ( fn ) {
   HTMLElement.prototype[ fn ] = function () {
      var args = [].slice.call( arguments );
      args.unshift( this );
      return window[ fn ].apply( null, args );
   }
});

/*--------------------------------------------------------------- MISSING API */

/**
 * HTMLElement.prototype.remove
 *
 * Removes an element from DOM
 *
 * @returns {HTMLElement}
**/
! HTMLElement.prototype.remove && (HTMLElement.prototype.remove = function () {
   this.removeNode( true );
   return this;
});

/**
 * HTMLElement.classList
 *
 * Define classList object that manages class names
**/
Object.defineProperty( HTMLElement.prototype, 'classList', {
   enumerable : false,
   configurable : true,
   // Our getter - the returned value of that `get` function will be used as the
   // `classList` object.
   get : function () {
      // create array with all class names
      var list = this.className.split(' ').filter( function ( item ) {
         // we don't want empty strings or falsy values here
         return !!item;
      });
      
      // create an object that will play the `classList` role
      var classList = {
         
         length : list.length,
         
         add : function () {
            for ( var i=0, l=arguments.length; i<l; i += 1 ) {
               // make sure the class does not exist
               if ( list.indexOf( arguments[i] ) < 0 ) {
                  // add to our list with class names
                  list.push( arguments[i] );
               }
            }
            update();   // we have to update the `className` of the element
         },
         
         remove : function () {
            for ( var i=0, l=arguments.length; i<l; i += 1 ) {
               // get the position of the class name we want to remove
               var index = list.indexOf( arguments[i] );
               if ( index > -1 ) {
                  list.splice( index, 1 );
               }
            }
            update();   // we have to update the `className` of the element
         },
         
         toggle : function ( item ) {
            if ( this.contains( item ) ) {
               this.remove( item );
               return false;
            }
            this.add( item );
            return true;
         },
         
         contains : function ( item ) {
            return list.indexOf( item ) > -1;
         },
         
         item : function ( i ) {
            return list[ i ] || null;
         },
         
         toString : function () {
            return this.className;
         }.bind( this )
         
      };
      
      // Declare a function that will update the `className` string every time
      // a class name has been added/removed from the `classList`.
      var update = function ( list, classList ) {
         // convert the array with class names into a string
         this.className    = list.join(' ');
         // update `length` property
         classList.length  = list.length;
      }.bind( this, list, classList );   // `this` is our HTMLElement
      
      return classList;
   }
});

