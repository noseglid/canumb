<%
function recurse(obj, index) {
  index = index || 0;

  function printNested(type) {
    var id = type + '-' + (index++); %>

    <div class="<%-type%>">
    <input type="checkbox" id="<%-id%>" />

    <label for="<%-id%>" title="<%-type%>">
    <%-type%> [<span class="count"><%-_.size(obj)%></span>]
    </label>

    <table class="<%-type%>-content">
    <% if (0 === _.size(obj)) { %>
    <tr>
      <td colspan="2" class="empty">&lt;empty&gt;</td>
    </tr>
    <% } %>
    <% _.each(obj, function(val, key) { %>
    <tr>
      <td class="<%-type%>-key"><%-key%>:</td>
      <td class="<%-type%>-value"><% index = recurse(val, index); %></td>
    </tr>
  <% }); %>

  </table>
  </div>

  <% }

  switch (typeof obj) {
  case 'undefined':
  case 'function':
  case 'xml':
    /* Not an JSON type. Should never occur. */
    break;

  case 'object':
    if (obj === null) {
      print('<div class="null" title="null">');
      print('null');
      print('</div>');
    } else if (obj instanceof Array) {
      printNested('array');
    } else if (obj instanceof Object) {
      printNested('object');
    }
    break;

  case 'string':
    print('<div class="string" title="string">');
    print(obj);
    print('</div>');
    break;

  case 'number':
    print('<div class="number" title="number">');
    print(obj);
    print('</div>');
    break;

  case 'boolean':
    print('<div class="boolean" title="boolean">');
    print (obj ? 'true' : 'false');
    print('</div>');
    break;
  }

  return index;
}

recurse(root);
%>
