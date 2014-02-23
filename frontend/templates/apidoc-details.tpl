<div><%- description %></div>

<div>
  <h3>HTTP Method</h3>
  <pre class="httpmethod"><%- method %></pre>
</div>

<div>
<h3>Params</h3>
<% if (0 === rest.length) { %>
  <span class="none">none</span>
<% } %>

<% _.each(rest, function(param) { %>
  <div>
    <pre class="name"><%- param.name %></pre>
    <span class="valid">{ <%- param.valid.join(', ') %> }</span>
    <span class="description"><%- param.description %></span>
  </div>
<% }); %>
</div>

<div>
<h3>Input</h3>
<% if (0 === input.length) { %>
  <span class="none">none</span>
<% } %>

<% _.each(input, function(param) { %>
  <div>
    <pre class="type"><%- param.type %></pre>
    <pre class="name"><%- param.name %></pre>
    <span class="description"><%- param.description %></span>
  </div>
<% }); %>
</div>

<div>
<h3>Errors</h3>
<% if (0 === errors.length) { %>
  <span class="none">none</span>
<% } %>

<% _.each(errors, function(error) { %>
  <div>
    <pre class="name error"><%- error.name %></pre>
    <pre class="httpcode">[<%- error.httpcode %>]</pre>
    <span class="description"><%- error.description %></span>
  </div>
<% }); %>
</div>
