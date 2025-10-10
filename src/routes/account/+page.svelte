<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();

  let dialog: HTMLDialogElement;

  function deleteAccountClicked() {
    dialog.showModal();
  }
</script>

<h1>Your Account</h1>

<p>Hi, <b>{data.user.username}</b>!</p>
<p>Your user ID is {data.user.id}.</p>
<form method="post" action="?/logout" use:enhance>
  <button>Sign out</button>
</form>

<h2>Edit Account Settings</h2>
<form method="post" action="?/editUsername">
  <p>
    <label for="username">Username</label>
    <input
      id="username"
      name="username"
      type="text"
      placeholder="Username"
      value={data.user.username}
    />
    <button>Update username</button>
  </p>
</form>

<form method="post" action="?/editPassword">
  <p>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" placeholder="New password" value="" />
    <button>Update password</button>
  </p>
</form>

<p>
  <button class="danger" onclick={deleteAccountClicked}>Delete account</button>
</p>

<dialog bind:this={dialog}>
  <p>
    Are you sure you want to delete your account? This will also delete all of your spells and
    cannot be undone!!!
  </p>
  <p>
    <button onclick={() => dialog.close()}>Cancel</button>
    <button class="danger">Delete account</button>
  </p>
</dialog>
