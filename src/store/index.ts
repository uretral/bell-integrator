import {Module, Mutation, VuexModule, Action, MutationAction} from "vuex-module-decorators";

const baseUrl = 'http://localhost:3000'
import {currentTime, makeGet} from "@/mixins/vuex";
import {IHistory, IHistoryEvent, IList} from "@/types/common";

@Module({
    namespaced: true
})

export default class StoreIndex extends VuexModule {

    public common: IHistoryEvent = {
        title: 'История общая',
        type: ''
    }

    public added: IHistoryEvent = {
        title: 'История добавлений',
        type: 'added'
    }
    public deleted: IHistoryEvent = {
        title: 'История удалений',
        type: 'deleted'
    }



    /*left listing*/
    public list: IList[] = []
    @Mutation setList(payload: IList[]) {
        this.list = payload
    }
    @Mutation pushList(payload: IList) {
        this.list.push(payload)
        this.history.push({
            item: payload,
            event: this.deleted.type,
            time: currentTime()
        })
    }

    @Action({commit: 'setList'})
    async getList() {
        return await makeGet({
            url: `${baseUrl}/countries`
        })
    }

    /*right listing*/
    public listingChosen: IList[] = []
    @Mutation pushListingChosen(payload: IList) {
        this.listingChosen.push(payload)
        this.history.push({
            item: payload,
            event: this.added.type,
            time: currentTime()
        })
    }

    /*history*/
    public history: IHistory[] = []
    @Mutation setHistory(payload: IHistory){
        this.history.push(payload)
    }
}
