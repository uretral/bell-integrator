<template>
  <div class="container">
    <header>
      <h2>
        {{title}}
      </h2>
      <div class="buttons">
        <button v-if="$route.name !== 'index'" @click="$router.push({name:'index'})">Главная</button>
        <button @click="$router.push({name:'history', params:{title: common.title}})">{{common.title}}</button>
        <button @click="$router.push({name:'history',params:{type: added.type,title: added.title}})">{{added.title}}</button>
        <button  @click="$router.push({name:'history',params:{type: deleted.type,title: deleted.title}})">{{deleted.title}}</button>
      </div>

    </header>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {IHistoryEvent} from "@/types/common";
const StoreIndex = namespace('StoreIndex')
    @Component
    export default class MainFrame extends Vue {
      @Prop({default: ''}) title!: string

      @StoreIndex.State('common') common!: IHistoryEvent
      @StoreIndex.State('added') added!: IHistoryEvent
      @StoreIndex.State('deleted') deleted!: IHistoryEvent

    }
</script>
