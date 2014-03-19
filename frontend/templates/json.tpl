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
    <% _.each(obj, function(val, key) { %>
    <tr>
      <td class="<%-type%>-key"><%-key%></td>
      <td class="<%-type%>-value"><% index = recurse(val, index); %></td>
    </tr>
  <% }); %>

  </table>
  </div>

  <% }

  switch (typeof obj) {
  case 'object':
    printNested(obj instanceof Array ? 'array' : 'object');
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
