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

  <% if (html5upload) { %>
  <input type="radio" name="radio-source" id="source-upload" />
  <div id="upload-container" class="possible-source">
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

  <input type="radio" checked="checked" name="radio-source" id="source-textarea" />
  <div id="textarea-container" class="possible-source">
    <textarea class="input" placeholder="<empty>"></textarea>
  </div>

  <div class="data-inout-result" id="result"></div>
</div>
