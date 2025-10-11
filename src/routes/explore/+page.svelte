<script lang="ts">
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();
</script>

<h1>Explore</h1>
<p>See all of the spells that have been posted!</p>

<div id="spells-container">
  {#each data.spells as spell}
    <a href="/spell/{spell.id}">
      <div class="spell">
        <p class="spell-name">{spell.name}</p>
        <p class="spell-summary">{spell.summary}</p>
        <p class="spell-author">By {spell.ownerUsername}</p>
      </div>
    </a>
  {/each}
</div>

<style>
  #spells-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -8px;
    margin-top: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .spell {
    width: 260px;
    margin: 8px;
    padding: 16px;
    border: 1px #d3c199 solid;
    border-radius: 8px;
    background: #ffefcd;
    transition: 200ms;
    cursor: pointer;
  }

  .spell:hover {
    border-color: #a89771;
    background: #d3c199;
  }

  .spell-name {
    margin-top: 0;
    font-size: 20px;
    font-weight: bold;
  }

  .spell-author {
    margin-bottom: 0;
    font-style: italic;
  }
</style>
