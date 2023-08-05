import { atom } from "recoil";

export const modalOpen = atom({
    key: "modalOpen",
    default: false
})

export const loadingControl = atom({
    key: "loadingControl",
    default: false
})