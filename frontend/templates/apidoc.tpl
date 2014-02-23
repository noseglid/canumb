<div>
  <h1>canumb API doc, v<%- version %></h1>
  <p>
    This is the documentation for the canumb REST interface. It's a REST API even though
    there really is no state to speak of. It benefits, however, from API consumer libraries
    tending to work well with the REST approach (e.g. <span class="pre">Backbone</span>).
  </p>
  <p>
    Each API listed below should be called using URLs on the form:
    <span class="pre">http://&lt;address&gt;/:api[/:param1[/:param2 ... ] ]</span>,
    where params (if any) are specified in each API documentation block. The valid values
    for a parameter are shown within the curly braces.
  </p>
  <p>
    If the API is a <span class="pre">POST</span> API, non-route parameters
    should be included as <span class="pre">POST</span>-data.
    This data should always be a JSON object, and transferred with
    <span class="pre">Content-Type: application/json</span>.
    The key of the object is specified in each
    API documentation block along with its type. It's value is up to you (mostly...).
  </p>
  <p>
    For instance, a sample HTTP request for converting the
    decimal number 12 would look like this:
    <pre>
    POST /convert/dec HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    Content-Length: 15

    {"number":"12"}
    </pre>
  </p>
  <p>
    The canumb API documentation may be fetched in JSON structure via the API itself.
    The list of available APIs are at <span class="pre">/doc</span> via
    <span class="pre">GET</span>, and the documentation for a specific API may be
    fetched at <span class="pre">/doc/:api</span>, also via <span class="pre">GET</span>
  </p>

  <% _.each(apis, function(api) { %>

    <hr />

    <h2 class="button api-title"><%- api.api %></h2>
    <div id="details-<%- api.api%>" class="details"></div>
  <% }); %>
</div>
