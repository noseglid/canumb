<div class="data-inout">
  <div class="button-container">

    <% _.each(algorithms, function(algo) { %>
    <input type="radio"
           <% if (checked === algo) { %> checked="checked" <% } %>
           name="algorithm"
           id="algorithm-<%-algo%>"
           value="<%-algo%>" />
    <label for="algorithm-<%-algo%>" class="button"><%-algo%></label>
    <% }); %>

  </div>

  <div id="textarea-container">
    <textarea class="input" placeholder="<empty>"></textarea>
  </div>

  <% if (html5upload) { %>
  <div id="upload-container">
    <form enctype="multipart/form-data" id="upload-form">
      <input type="file" name="data" />
    </form>
    <div class="button" id="upload-file">... or pick file</div>
    <div id="upload-progress">
      <div id="upload-progress-bar"></div>
      <div id="upload-progress-text">0 %</div>
    </div>

    <div id="upload-status">
      <div id="upload-nice-text"></div>
      <img src="images/ajax-loader.gif" alt="Loading..." id="upload-ajax-loader" />
    </div>
  </div>
  <% } %>


  <div class="data-inout-result" id="result"></div>
</div>
