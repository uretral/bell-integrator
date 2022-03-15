<template>
  <MainFrame title="Список">

    <div class="row">
      <div class="col left">

        <div class="col-input">
          <input type="text" placeholder="поиск" v-model="search" @keyup="filter()"/>
          <a href="javascript:" class="clear-input" @click="clearInput()">-</a>
        </div>

        <div class="col-sort">
          <i>Сортировка:</i>
          <div class="col-sort-radio">
            <label for="alphabet"><input id="alphabet" :value="false" type="radio" v-model="searchType" /> По алфавиту (asc)</label>
            <label for="cnt"><input id="cnt" type="radio" :value="true"  v-model="searchType"/> По числу вхождений (desc)</label>
          </div>

        </div>

        <div class="col-list">

          <div class="col-list-item" v-for="(i,key) in filter()" :key="`common_${key}`" @click="toProof(i)">
            <span>
              {{ i.name }} <em>({{ i.id }})</em>
            </span>
            <div class="btn-block">
              <i v-if="i.hasOwnProperty('cnt') && searchType">  число вхождений: {{ i.cnt }} </i>
              <button @click="moveListItem(i)"> &rsaquo;</button>
            </div>
          </div>

        </div>

      </div>
      <div class="col right">
        <div class="col-store">
          <div class="col-list-item" v-for="(i,key) in listingChosen" :key="`chosen_${key}`">
            <span>{{ i.name }} <em>({{ i.id }})</em></span>

            <button @click="moveListItemBack(key)"> &lsaquo;</button>

          </div>
        </div>
      </div>
    </div>

    <div class="log">
      <i><sup>*</sup> Отображение имен потомков по клику на строку</i> <br/>
      <p v-text="proofText"></p>
    </div>

  </MainFrame>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import MainFrame from "@/components/layout/MainFrame.vue";
import listingMixin from "@/mixins/listing.mixin";
import {IList} from "@/types/common";

@Component({
  components: {MainFrame}
})
export default class Index extends Mixins(listingMixin) {

  public proofText = ''
  public searchType = true

  filter() {
    return  this.searchType ? this.filterCount() : this.filterAlphabet()
  }

  filterAlphabet() {
    return this.list.filter(a =>
        a.name.toLowerCase().includes(this.search.toLowerCase()) ||
        a.regions.filter(b => b.name.toLowerCase().includes(this.search.toLowerCase())).length
    )
        .sort(this.sortArray)
  }

  filterCount() {
    let searchStr = this.search.toLowerCase()

    return this.list.reduce((acc: any[], a: IList) => {
      delete a.cnt
      let cnt = (a.name.toLowerCase().match(new RegExp(searchStr, 'g')) || []).length
          + a.regions.reduce((accum, b) => (b.name.toLowerCase().match(new RegExp(searchStr, 'g')) || []).length + accum, 0)
      if (cnt) {
        if (this.search != '') {
          a['cnt'] = cnt
        }
        acc.push(a)
      }

      return acc

    }, [])
        .sort((a, b) => b.cnt - a.cnt)
  }

  moveListItem(listItem: IList) {
    let index = this.list.findIndex(i => i.id === listItem.id)
    if (index !== -1) {
      this.pushListingChosen(
          this.list.splice(index, 1)[0]
      )
      this.listingChosen.sort(this.sortArray)
      this.toProof(listItem)
    }
  }

  moveListItemBack(key: number) {
    let item = this.listingChosen.splice(key, 1)
    this.pushList(item[0])
    this.list.sort(this.sortArray)
  }

  clearInput() {
    this.search = ''
    this.filter()
  }

  toProof(item: IList) {
    this.proofText = item.regions.map(i => i.name).join(',  ')
  }

  sortArray(x: any, y: any) {
    return x.name.localeCompare(y.name);
  }

  async created() {
    await this.getList()
  }

}
</script>
