import {Component, Prop, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

import {IList} from "@/types/common";
const StoreIndex = namespace('StoreIndex')

@Component
export default class listingMixin extends Vue {

    public search = ''

    @StoreIndex.State('list') list!: IList[]
    @StoreIndex.Mutation('setList') setList!: (payload: IList[]) => void
    @StoreIndex.Mutation('pushList') pushList!: (payload: IList) => void
    @StoreIndex.Action('getList') getList!: () => void

    @StoreIndex.State('listingChosen') listingChosen!: IList[]
    @StoreIndex.Mutation('pushListingChosen') pushListingChosen!: (payload: IList) => void

}
