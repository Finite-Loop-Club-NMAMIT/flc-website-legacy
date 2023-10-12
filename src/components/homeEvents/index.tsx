import { api } from "../../utils/api";

const HomeEvents:React.FC = () => {

    const events = api.eventRouter.getAvailableEvent.useQuery();

    if (!events) return <></>

    return (
        <section className="w-full">

        </section>
    )
};

export default HomeEvents;