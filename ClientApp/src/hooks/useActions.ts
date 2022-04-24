import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { activeUserActions } from "../store/user/activeUser.slice"

const allActions = {
    ...activeUserActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}