"use client";

import { useEffect, useState } from "react";
import { Send03 } from "@untitledui/icons";
import Image from "next/image";
import type { Key } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { fetchNodeInfo } from "@/lib/lnd";

export const HomeScreen = () => {
    const waiters = [
        { label: "Bob Trevino", id: "bob", avatarUrl: "https://www.untitledui.com/images/avatars/nicolas-trevino?" },
        { label: "Carol Strong", id: "carol", avatarUrl: "https://www.untitledui.com/images/avatars/rachael-strong?" },
        { label: "Dave Kauffman", id: "dave", avatarUrl: "https://www.untitledui.com/images/avatars/lyle-kauffman?" },
    ];

    const [selectedWaiter, setSelectedWaiter] = useState<Key | null>(null);
    const [amount, setAmount] = useState("");
    const [nodeInfo, setNodeInfo] = useState<{ alias: string; balance: string; identityPubkey: string } | null>(null);

    useEffect(() => {
        fetchNodeInfo(setNodeInfo);
    }, []);

    function handleClick() {
        console.log("Selected Waiter ID:", selectedWaiter);
        console.log("Amount:", amount);
    }

    return (
        <div className="flex h-dvh flex-col">
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 md:px-8">
                <div className="relative flex size-28 items-center justify-center">
                    <Image src="icon.svg" alt="Lightning Network" width={20} height={20} className="size-20" />
                </div>

                <h1 className="max-w-3xl text-center text-display-sm font-semibold text-primary">Lightning Network Tip Jar</h1>

                <p className="mt-4 max-w-lg text-center text-md text-tertiary">
                    Support our staff by sending a tip directly to their wallet. It's fast, secure, and goes 100% to the waiter.
                </p>

                {nodeInfo && (
                    <div className="mt-4 flex flex-col items-center gap-1">
                        <p className="text-sm text-tertiary">
                            Connected to <span className="font-semibold text-primary">{nodeInfo.alias}</span>
                        </p>
                        <p className="text-sm text-tertiary">
                            Balance: <span className="font-semibold text-primary">{parseInt(nodeInfo.balance).toLocaleString()} sats</span>
                        </p>
                    </div>
                )}

                <div className="relative mt-4 rounded-lg border border-secondary bg-secondary p-4">
                    <div className="mt-2 flex flex-col gap-8">
                        <Select isRequired size="md" label="Waiter / waitress" placeholder="Select your server" items={waiters} onChange={setSelectedWaiter}>
                            {(item) => (
                                <Select.Item
                                    id={item.id}
                                    supportingText={item.supportingText}
                                    isDisabled={item.isDisabled}
                                    icon={item.icon}
                                    avatarUrl={item.avatarUrl}
                                >
                                    {item.label}
                                </Select.Item>
                            )}
                        </Select>
                    </div>
                    <div className="mt-2 flex flex-col gap-8">
                        <Input isRequired label="Amount (sats)" placeholder="5000" value={amount} onChange={setAmount} />
                    </div>
                    <div className="mt-4 flex flex-col gap-8">
                        <Button color="primary" size="md" iconTrailing={<Send03 data-icon />} onClick={handleClick} isDisabled={!selectedWaiter || !amount}>
                            Send tip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
