<script lang="ts">
  import Trash from "lucide-svelte/icons/trash";
</script>

<h1>Spell editor</h1>

<p>
  <input type="text" placeholder="Name" />
</p>
<p><input type="summary" placeholder="Summary" /></p>

<h2>Features</h2>
<p>
  <label for="duation">feature 1</label>
  <input id="duration" value="value" />
  <button class="danger"><Trash size={16} /></button>
</p>
<p>
  <button>Add new feature</button>
</p>

<h2>Components</h2>
<p>
  <input value="1" />
  <input value="component 1" />
  <button class="danger"><Trash size={16} /></button>
</p>
<p>
  <button>Add new component</button>
</p>

<h2>Procedure</h2>
<textarea rows="6"></textarea>

<h2>Notes</h2>
<textarea rows="6"> </textarea>

<p><button>Save spell</button></p>
