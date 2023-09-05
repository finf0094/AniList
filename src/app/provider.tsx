'use client'

import { CacheProvider } from "@emotion/react";
import { useEmotionCache, MantineProvider } from "@/components";
import { useServerInsertedHTML } from "next/navigation";

import { store } from "./redux/store";
import { Provider as ReduxProvider } from 'react-redux'


export default function Provider({
    children
}: {
    children: React.ReactNode
}) {
    const cache = useEmotionCache();
    cache.compat = true;

    useServerInsertedHTML(() => (
        <style
            data-emotion={
                `${cache.key} ${Object.keys(cache.inserted).join(" ")}`
            }
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(" "),
            }}
        />
    ));

    return (
        <CacheProvider value={cache}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: "dark", colors: {
                        pink: ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
                    }, primaryColor: 'pink'
                }}>
                <ReduxProvider store={store} >
                    {children}
                </ReduxProvider>
            </MantineProvider>
        </CacheProvider>
    )
}



