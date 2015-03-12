document.write( printList([
   { label : 'Item 1' },
   {
      label : 'Item 2',
      list  : {
         '1' : { label : 'Sub Item 2.1' },
         '2' : { label : 'Sub Item 2.2' },
         '3' : { label : 'Sub Item 2.3' }
      }
   },
   {
      label : 'Item 3',
      list  : [
         {
            label : 'Sub Item 3.1',
            list  : {
               '1' : { label : 'Sub Item 3.1.1' },
               '2' : { label : 'Sub Item 3.1.2' }
            }
         },
         { label : 'Sub Item 3.2' },
         { label : 'Sub Item 3.3' }
      ]
   }
]) );

function printList( list ) {
   var tag  = list.constructor === Array ? 'ol' : 'ul';
   var html = '<' + tag + '>';    // here we generate our HTML string
   // go through each list item
   for ( var name in list ) {
      if ( ! list.hasOwnProperty( name ) ) {
         continue;
      }
      html += '<li>' + list[name].label;
      if ( list[name].list ) {
         html += printList( list[name].list );
      }
      html += '</li>';
   }
   html += '</' + tag + '>';
   // finally output the HTML
   return html;
}