'use client'

import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger,
    rem,
    Title,
} from '@/components';
import { useDisclosure } from '@/components'

import { FaFilter } from '@react-icons/all-files/fa/FaFilter'
import Link from 'next/link';
import SearchBox from './searchbox/SearchBox';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEvent } from 'react';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => (
    {
        inner: {
            height: HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colors.dark[6],
            borderRadius: "5px",
            "WebkitBoxShadow": "0px 5px 12px 0px rgba(0, 0, 0, 0.03)",
            "MozBoxShadow": "0px 5px 12px 0px rgba(0, 0, 0, 0.03)",
            boxShadow: "0px 5px 12px 0px rgba(0, 0, 0, 0.03)"
        },

        links: {
            [theme.fn.smallerThan('sm')]: {
                display: 'none',
            },
        },

        burger: {
            [theme.fn.largerThan('sm')]: {
                display: 'none',
            },
        },

        link: {
            display: 'block',
            lineHeight: 1,
            padding: `${rem(8)} ${rem(12)}`,
            borderRadius: theme.radius.sm,
            textDecoration: 'none',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
        },

        linkLabel: {
            marginRight: rem(5),
        },
    }));


export interface HeaderActionProps {
    links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

export function HeaderAction({ links }: HeaderActionProps) {
    const router = useRouter();

    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);



    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <a href={link.link}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
                key={item.link}>
                <Menu.Item>
                    {item.label}
                </Menu.Item>
            </a>
        ));

        if (menuItems) {
            return (
                <a
                    href={link.link}
                    className={classes.link}
                    onClick={(event) => event.preventDefault()}
                    key={link.label}
                >
                    <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                        <Menu.Target>

                            <Center>
                                <span className={classes.linkLabel}>
                                    {link.label}
                                </span>
                            </Center>

                        </Menu.Target>
                        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                    </Menu >
                </a>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.link}
                className={classes.link}
                onClick={(event: React.FormEvent) => {
                    event.preventDefault
                    router.push(`/${link.link}/`)
                }}
                passHref
            >
                {link.label}
            </Link>
        );
    });

    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0, margin: 10 }} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    <Title order={3} color='pink'><Link href="/" style={{ textDecoration: "none", color: "inherit" }}>AniList</Link></Title>
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group>
                    <SearchBox />
                    <Button><FaFilter /></Button>
                </Group>

            </Container>
        </Header>
    );
}