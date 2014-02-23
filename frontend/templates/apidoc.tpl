<div>
  <h1>Canumb API doc, v<%- version %></h1>
  <p>
    This is the documentation for the canumb REST interface. This is a REST API even though
    there really is no state to speak of. However, it benefits from API consumer libraries
    tending to work well with the REST approach (e.g. Backbone).
  </p>
  <p>
    Each API listed below should be called using URL formatted as:
    <span class="pre">http://&lt;address&gt;/&lt;api&gt;[/&lt;param1&gt;[/&lt;param2&gt; .. ] ]</span>,
    where params (if any) are specified in each API documentation block.
  </p>
  <p>
    If the API is a POST API, some parameters should be included as POST-data.
    This data should always be a JSON object, and transferred with
    <span class="pre">Content-Type: application/json</span>.
    The key of the object is specified in each
    API documentation block along with its type. It's value is up to you (mostly...).
  </p>
  <p>
    For instance, a sample HTTP request for converting the number 12 would look like this:
    <pre>
    POST /convert/dec HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    Content-Length: 15

    {"number":"12"}
    </pre>
  </p>

  <% _.each(apis, function(api) { %>

    <hr />

    <h2 class="button api-title"><%- api.api %></h2>
    <div id="details-<%- api.api%>" class="details"></div>
  <% }); %>
</div>
