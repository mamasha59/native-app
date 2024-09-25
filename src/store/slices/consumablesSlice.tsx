import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface iConsumableItem {
    id: string,
    name: string,
    category: string,
    active: boolean,
    usagePerProcedure: number,
    quantity: number,
}

const initialState = {
    consumablesItem : [
        { id: uuidv4(), name: 'Катетеры', category: 'catheters', usagePerProcedure: 1, active: true, quantity: 0 },
    ]
}

const consumablesSlice = createSlice({
    name: 'consumables',
    initialState,
    reducers: {
        removeConsumableItem: (state, action:PayloadAction<{id: string}>) => {
            const id = action.payload.id;
            if(id){
               state.consumablesItem = state.consumablesItem.filter(item => item.id !== id);
            }
        },
        consumableItemSwitch: (state, action:PayloadAction<{id: string}>) => {
            const id = action.payload.id;
            const item = state.consumablesItem.find((item) => item.id === id);
            if (item) {
                item.active = !item.active;  // toggle true  false
            }
            
        },
        consumableItemChangeConsumption: (state, action:PayloadAction<{id: string, value: string}>) => {
            const id = action.payload.id;
            const item = state.consumablesItem.find((item) => item.id === id);
            if (item) {
                item.usagePerProcedure = +action.payload.value;
            }
        },
        consumableItemChangeQuantity: (state, action:PayloadAction<{id: string, value: string}>) => {
            const id = action.payload.id;
            const item = state.consumablesItem.find((item) => item.id === id);
            if (item) {
                item.quantity = +action.payload.value;
            }
        },
        addNewConsumableItem: (state, action:PayloadAction<iConsumableItem>) => {
            const newItem:iConsumableItem = {
                id: action.payload.id,
                active: false,
                category: action.payload.category,
                name: action.payload.name,
                usagePerProcedure: action.payload.usagePerProcedure,
                quantity: action.payload.quantity
            };

            state.consumablesItem = [...state.consumablesItem, newItem];
        },
        decreaseQuantityOFConsumableItem: (state) => {
            state.consumablesItem.forEach((item) => {
                const result = item.quantity - item.usagePerProcedure;
                if(item.active && item.quantity !== 0){
                    if(result < 0){
                        item.quantity = 0;
                    }else {
                        item.quantity = result;
                    }
                }
            })
        },
    }
});

export const {
    removeConsumableItem,
    consumableItemSwitch,
    consumableItemChangeConsumption,
    addNewConsumableItem,
    consumableItemChangeQuantity,
    decreaseQuantityOFConsumableItem
} = consumablesSlice.actions;
export default consumablesSlice.reducer;
