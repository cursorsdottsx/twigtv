import { GetServerSideProps } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home({ pusherId, pusherCluster }: { pusherId: string; pusherCluster: string }) {
    const [session, loading] = useSession();
    const [navOpen, setNavOpen] = useState(false);
    const [pusher, setPusher] = useState<any>(undefined);

    useEffect(() => {
        //@ts-ignore
        if (typeof window.Pusher !== "undefined") {
            //@ts-ignore
            window.Pusher.logToConsole = true;

            //@ts-ignore
            const pusher = new window.Pusher(pusherId, {
                cluster: pusherCluster,
            });

            const channel = pusher.subscribe("my-channel");

            channel.bind("my-event", (data: any) => {
                alert(JSON.stringify(data));
            });

            setPusher(pusher);
        } else location.reload();
    }, []);

    return (
        <>
            <Head>
                <title>TwigTV</title>
                <link rel="shortcut icon" href="/ttv.png" type="image/x-icon" />
                <script src="https://js.pusher.com/7.0/pusher.min.js" defer></script>
            </Head>
            <div className="flex flex-col bg-black h-screen w-screen">
                <header className="h-24 shadow-2xl flex justify-between items-center py-2 px-6">
                    <h1 className="text-green text-4xl font-thin select-none">TwigTV</h1>
                    {loading ? null : session ? (
                        <div className="flex items-center">
                            <div className="relative inline-block text-left">
                                <div>
                                    <img
                                        className="w-16 h-16 cursor-pointer hover:opacity-90 transition-opacity"
                                        src={
                                            session.user.image ||
                                            "https://images-ext-2.discordapp.net/external/2dZVVL6feMSM7lxfFkKVW__LToSOzmToSEmocJV5vcA/https/cdn.discordapp.com/embed/avatars/0.png"
                                        }
                                        alt=""
                                        onClick={() => setNavOpen(!navOpen)}
                                    />
                                </div>
                                <div
                                    className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none${
                                        navOpen ? "" : " opacity-0 pointer-events-none"
                                    } transition-opacity`}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <div className="py-1" role="none">
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-200 cursor-pointer transition-colors"
                                            role="menuitem"
                                        >
                                            Stream
                                        </a>
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-gray-200 cursor-pointer transition-colors"
                                            role="menuitem"
                                            onClick={() => signOut()}
                                        >
                                            Log out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <a
                            onClick={() => signIn("discord")}
                            className="text-gray-300 text-xl font-thin my-2 mx-4 cursor-pointer"
                        >
                            Log in
                        </a>
                    )}
                </header>
                {loading ? null : session ? (
                    <div></div>
                ) : (
                    <div className="flex-1 grid place-items-center">
                        <div></div>
                        <div className="text-center">
                            <h1 className="text-green text-7xl font-thin">The easiest way to stream.</h1>
                            <p className="text-gray-200 text-xl font-thin my-2">
                                Easily integrate with your viewers and share your epic plays.
                            </p>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log(process.env);
    return {
        props: {
            pusherId: process.env.APP_KEY,
            pusherCluster: process.env.APP_CLUSTER,
        },
    };
};
