<template>
  <div class="d-flex justify-content-end">
    <b-form-select v-model="$i18n.locale" :options="langs" style="max-width: 60px;" ></b-form-select>
  </div>
</template>

<script>
export default {
  name: "Locale",
  data() {
    return {
      langs: ['ru', 'en'],
    }
  }
}
</script>

<style scoped>

</style>
