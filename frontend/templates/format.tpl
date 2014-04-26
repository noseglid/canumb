<div class="data-inout">

  <input type="radio"
         checked="checked"
         name="datatype"
         id="datatype-json"
         value="json" />
  <label for="algorithm-json" class="button">JSON</label>

  <div class="textarea-container">
    <textarea></textarea>
  </div>

  <div id="result">
    <div class="content-tabs">
      <input type="radio" name="format-tabs" id="format-tabs-browse" checked="checked" />
      <label class="tab button" for="format-tabs-browse">browse</label>
      <article>
        <img src="/images/expand-all.png" class="expand" />
        <img src="/images/collapse-all.png" class="shrink" />
        <div id="browse-area" class="format-result"></div>
      </article>

      <input type="radio" name="format-tabs" id="format-tabs-formatted" />
      <label class="tab button" for="format-tabs-formatted">formatted</label>
      <article><div id="formatted-area" class="format-result"></div></article>

      <input type="radio" name="format-tabs" id="format-tabs-minified" />
      <label class="tab button" for="format-tabs-minified">minified</label>
      <article><div id="minified-area" class="format-result"></div></article>
      <hr/>
    </div>

  </div>
</div>
