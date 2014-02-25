<div class="data-inout">
  <div class="button-container">

    <% _.each(algorithms, function(algo) { %>
    <input type="radio"
           checked="checked"
           name="algorithm"
           id="algorithm-<%-algo%>"
           value="<%-algo%>" />
    <label for="algorithm-<%-algo%>" class="button"><%-algo%></label>
    <% }); %>

  </div>

  <textarea class="input"></textarea>

  <div class="data-inout-result" id="result"></div>
</div>
