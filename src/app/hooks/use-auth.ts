import { useAppSelector } from "@app/hooks/redux-hooks";

export function useAuth(){
    const {email,token,id} = useAppSelector(state => state.user)

    return ({
        isAuth: !!email,
        email,
        id
    })
}