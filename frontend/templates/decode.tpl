<div id="decode-input">
  <textarea placeholder="I eat coded data for breakfast."></textarea>

  <div class="button-container">
    <input type="radio"
           checked="checked"
           name="decode-algorithm"
           id="decode-algorithm-base64"
           value="base64" />
    <label for="decode-algorithm-base64" class="button">base64</label>

    <input type="radio"
           name="decode-algorithm"
           id="decode-algorithm-uri"
           value="uri" />
    <label for="decode-algorithm-uri" class="button">uri</label>
  </div>

  <div id="decode-result"></div>
</div>
