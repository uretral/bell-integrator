<template>
  <MainFrame :title="$route.params['title']">


    <div class="row">
      <div class="col single">
        <div class="thead">
          <div class="cell">Обьект</div>
          <div class="cell">Действие</div>
          <div class="cell">Время</div>
        </div>
        <div class="tbody" v-for="(i, key) in historyList()" :key="key">
          <div class="cell">
            {
            <span><b>name:</b> {{ i.item.name }}</span>,
            <span><b>id:</b> {{ i.item.id }}</span>
            }
          </div>
          <div class="cell" v-text="i.event === 'added' ? 'Добавление' : 'Удаление'"></div>
          <div class="cell">{{ i.time }}</div>

        </div>

      </div>
    </div>

  </MainFrame>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import MainFrame from "@/components/layout/MainFrame.vue";
import {namespace} from 'vuex-class'
import {IHistory} from "@/types/common";

const StoreIndex = namespace('StoreIndex')
@Component({
  components: {MainFrame}
})
export default class History extends Vue {

  @StoreIndex.State('history') history!: IHistory[]

  historyList() {
    let type = this.$route.params['type']
    return  type != undefined ? this.history.filter(i => i.event == type) : this.history
  }

}
</script>
