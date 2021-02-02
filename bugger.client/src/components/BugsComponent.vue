<template>
  <router-link :to="{name: 'ActiveBug', params: {id: bugProp.id} }">
    <div class="BugsComponent row">
      <div class="col-3 b">
        {{ bugProp.title }}
      </div>
      <div class="col-3 b">
        {{ bugProp.creator.name }}
      </div>
      <div class="col-3 b" :class="bugProp.closed == true ? 'is-closed' : 'is-open'">
        {{ bugProp.closed ? "closed" : "Open" }}
      </div>
      <div class="col-3 b">
        {{ bugProp.updatedAt.slice(0,10) }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'BugsComponent',
  props: {
    bugProp: { type: Object, required: true }
  },
  setup() {
    return {
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.b{
  color: black
  ;
}
.is-open{
  color: green;
}
.is-closed{
  color: red;
}
</style>
