import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const channels = new Pusher({
    appId: process.env.APP_ID!,
    secret: process.env.APP_SECRET!,
    key: process.env.APP_KEY!,
    cluster: process.env.APP_CLUSTER!,
});

export default function (req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;

    channels.trigger("event-channel", "event-name", data);
}
