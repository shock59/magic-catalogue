<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();
</script>

<h1>Magic Catalogue</h1>

<p>
  {#if data.user}
    Hi {data.user.username}!
  {:else}
    You are signed out, <a href="/login">Sign in or register</a>
  {/if}
</p>
{#if data.user}
  <form method="post" action="?/logout" use:enhance>
    <button>Sign out</button>
  </form>
{/if}

<p>Things to do</p>
<ul>
  <li>Work out how to use SvelteKit</li>
  <li>Create the auth system</li>
  <li>Add saving spells and recipes</li>
  <li>Pretty UI</li>
  <li>Add sharing system (maybe idk)</li>
</ul>
