<script lang="ts">
  let { children } = $props();
  import "../style.css";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Quintessential&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  {@render children?.()}
</main>
