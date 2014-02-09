<div id="encode-input">
  <textarea placeholder="Gimme data... om nom nom nom"></textarea>

  <div class="button-container">
    <input type="radio"
           checked="checked"
           name="encode-algorithm"
           id="encode-algorithm-base64"
           value="base64" />
    <label for="encode-algorithm-base64" class="button">base64</label>

    <input type="radio"
           name="encode-algorithm"
           id="encode-algorithm-uri"
           value="uri" />
    <label for="encode-algorithm-uri" class="button">uri</label>
  </div>

  <div id="encode-result" class="decenc-result"></div>
</div>
