<div>
  <h1>canumb API doc, v<%- version %></h1>
  <p>
    This is the documentation for the canumb
    <code><a href="http://en.wikipedia.org/wiki/Representational_state_transfer">REST</a></code>
    interface. It's a REST API even though there really is no state to speak
    of. It benefits, however, from API consumer libraries tending to work well
    with the REST approach (e.g. <code><a href="http://www.backbonejs.org">Backbone</a></code>).
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
    This data can be encoded and transferred with one of
    <ul>
      <li><span class="pre">application/json</span></li>
      <li><span class="pre">application/x-www-form-urlencoded</span></li>
      <li><span class="pre">multipart/form-data</span></li>
    </ul>

    The input data is describe in each API documentation below, and its value is up to you (mostly...).
  </p>
  <p>
    For instance, a sample HTTP request for converting the
    decimal number 12 using <span class="pre">application/json</span> transfer encoding
    would look like this:
    <pre class="example">POST /convert/dec HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 15

{"number":"12"}</pre>

    Performing the above HTTP request using command-line <a href="http://curl.haxx.se/">cURL</a> can be done as:

    <pre class="example">curl -H 'Content-Type: application/json' -d '{ "number" : "12" }' http://localhost:5000/convert/dec</pre>

    which used the <span class="pre">application/json</span> content type. An equivalent request
    can be perfomed, using <span class="pre">multipart/form-data</span> instead:

    <pre class="example">curl -Fnumber=12 http://localhost:5000/convert/dec</pre>

    and using <span class="pre">application/x-www-form-urlencoded</span>

    <pre class="example">curl -d "number=12" http://localhost:5000/convert/dec</pre>
  </p>
  <p>
  Some parameters can be sent <i>as files</i>. This basically means they can be sent using
  <span class="pre">multipart</span> where a <span class="pre">Content-Disposition</span>
  contains the <span class="pre">filename</span> param. Something like:
  <pre class="example">Content-Disposition: form-data; name="paramname"; filename="somefile.ext"</pre>
  If this is an option, it is indicated at the param documentation.
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
