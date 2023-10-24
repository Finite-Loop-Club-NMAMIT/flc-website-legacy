import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { api } from "../../utils/api";

import Button from "../button"

type RegisterEventBtnProps = {
    eventId: number,
    status: string,
    showModal: ()=>void,
    setEventId: ()=>void
}

const RegisterEventBtn: React.FC<RegisterEventBtnProps> = ({ eventId, status, showModal, setEventId }) => {

    const userInfo = api.eventRouter.getUserForEvent.useQuery();

    const handleRegisterBtn = async () => {
        if (status === 'unauthenticated') return signIn("google")
        const isRegistered = userInfo.data && userInfo.data.Events.some((id)=>id.eventId===eventId)
        if (isRegistered) { toast.error("You have already registered!!"); return }
        if (userInfo.data && !userInfo.data.isMember) { console.log("razorPay"); return }
        setEventId();
        showModal();
    }

    return (
            <Button onClick={() => void handleRegisterBtn()} className="w-fit h-fit mx-auto mb-4">
                Register Event
            </Button>
    )
}

export default RegisterEventBtn;