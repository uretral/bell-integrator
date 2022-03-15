import axios from "axios";
import {IResponse} from "@/types/common";
import {eventBus} from "@/eventBus";


export const emitSuccess = (response: any) => {
    eventBus.$emit('message', {
        type: 'success',
        title: 'Загружено'
    })
    return response.data
}
export const emitError = (error: any) => {
    if (error.response) {
        eventBus.$emit('message', {
            type: 'error',
            title: 'Ошибка ответа',
            content: error.response.status
        })
    } else if (error.request) {
        eventBus.$emit('message', {
            type: 'error',
            title: 'Ошибка запроса',
            content: error.request
        })
    } else {
        eventBus.$emit('message', {
            type: 'error',
            title: 'Неизвестная ошибка',
            content: error.message
        })
    }
}
export const makePost = async (data: IResponse) => {
    try {
        const response = await axios.post(data.url, data.payload);
        if (await response) {
            return emitSuccess(await response)
        }
    } catch (error) {
        return emitError(error)
    }
}

export const makeGet = async (data: IResponse) => {
    try {
        const response = await axios.get(data.url);
        if (await response) {
            return emitSuccess(await response)
        }
    } catch (error) {
        return emitError(error)
    }
}

export const currentTime = () => {
    return new Date().toISOString().substr(0,19).replace('T',' ')
}
