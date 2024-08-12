type SellWishItem = {
    item: {
        article: number,
        quantity: number
    }
}

export type SellDirectItem = {
    item: {
        article: number,
        quantity: number,
        price: number,
        penalty: number
    }
}

export type SellDirectField = 'quantity' | 'price' | 'penalty'

type Order = {
    order: {
        article: number,
        quantity: number,
        modus: number,
    }
}

export type Production = {
    production: {
        article: number,
        quantity: number,
    }
}

type WorkingTime = {
    workingtime: {
        station: number,
        shift: number,
        overtime: number,
    }
}

export type SupplyChainInput = {
    input: {
        qualitycontrol: {
            type: string,
            delay: number,
            losequantity: number
        },
        sellwish: SellWishItem[],
        selldirect: SellDirectItem[],
        orderlist: Order[],
        productionlist: Production[],
        workingtimelist: WorkingTime[],
    }
}
