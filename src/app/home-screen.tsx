"use client";

import { Send03 } from "@untitledui/icons";
import Image from "next/image";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";

export const HomeScreen = () => {
    const waiters = [
        { label: "Rachael Strong", id: "rachael", avatarUrl: "https://www.untitledui.com/images/avatars/rachael-strong?" },
        { label: "Nicolas Trevino", id: "nicolas", avatarUrl: "https://www.untitledui.com/images/avatars/nicolas-trevino?" },
        { label: "Lyle Kauffman", id: "lyle", avatarUrl: "https://www.untitledui.com/images/avatars/lyle-kauffman?" },
    ];
    return (
        <div className="flex h-dvh flex-col">
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 md:px-8">
                <div className="relative flex size-28 items-center justify-center">
                    <Image src="/lightning-network-icon.svg" alt="Lightning Network" width={20} height={20} className="size-20" />
                </div>

                <h1 className="max-w-3xl text-center text-display-sm font-semibold text-primary">Lightning Network Tip Jar</h1>

                <p className="mt-4 max-w-lg text-center text-md text-tertiary">
                    Support our staff by sending a tip directly to their wallet. It's fast, secure, and goes 100% to the waiter.
                </p>

                <div className="relative mt-4 rounded-lg border border-secondary bg-secondary p-4">
                    <div className="mt-2 flex flex-col gap-8">
                        <Select isRequired size="md" label="Waiter / waitress" placeholder="Select your server" items={waiters}>
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
                        <Input isRequired label="Amount (sats)" placeholder="5000" />
                    </div>
                    <div className="mt-4 flex flex-col gap-8">
                        <Button color="primary" size="md" iconTrailing={<Send03 data-icon />}>
                            Send tip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
