<div class="data-inout">
  <div class="button-container">
    <input type="radio"
           checked="checked"
           name="<%-type%>-algorithm"
           id="<%-type%>-algorithm-base64"
           value="base64" />
    <label for="<%-type%>-algorithm-base64" class="button">base64</label>

    <input type="radio"
           name="<%-type%>-algorithm"
           id="<%-type%>-algorithm-uri"
           value="uri" />
    <label for="<%-type%>-algorithm-uri" class="button">uri</label>

    <input type="radio"
           name="<%-type%>-algorithm"
           id="<%-type%>-algorithm-base85"
           value="base85" />
    <label for="<%-type%>-algorithm-base85" class="button">base85</label>
  </div>

  <div class="textarea-container">
    <textarea></textarea>
  </div>

  <div class="data-inout-result" id="<%-type%>-result"></div>
</div>
