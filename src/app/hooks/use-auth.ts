import { useAppSelector } from "@app/hooks/redux-hooks";

export function useAuth(){
    const {email,id} = useAppSelector(state => state.user)

    return ({
        isAuth: !!email,
        email,
        id
    })
}