<div class="notify">
  <% if ('upload' === src) { %>
    <img src="images/upload.png" title="hash from latest file upload" />
  <% } else if ('input' === src) { %>
    <img src="images/linedpaper.png" title="hash from text area" />
  <% } %>

  <p class="notify"><%-data%></p>
</div>
