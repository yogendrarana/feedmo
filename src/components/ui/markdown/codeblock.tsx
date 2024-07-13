"use client"

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import React, { useMemo, ReactNode, isValidElement } from "react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
    filename?: string;
    switcher?: React.ReactNode;
    copyable?: boolean;
}

export default function CodeBlock({ children, className, filename, switcher, copyable }: CodeBlockProps) {
    const language = className?.replace(/language-/, '') || '';

    const getCodeString = (children: ReactNode): string => {
        if (typeof children === 'string') {
            return children;
        }

        if (isValidElement(children)) {
            if (typeof children.type === 'function') {
                try {
                    console.log("checkpoint 1")
                    const renderedContent = children.type({});
                    return getCodeString(renderedContent);
                } catch (error) {
                    console.error("Error rendering MDX component:", error);
                    return '';
                }
            }

            if (children.props.children) {
                return getCodeString(children.props.children);
            }
        }

        if (Array.isArray(children)) {
            return children.map(getCodeString).join('');
        }

        return '';
    };

    const codeString = useMemo(() => getCodeString(children), [children]);

    const addLineNumbers = (code: string) => {
        return code.trimEnd().split('\n').map((line, index) => (
            <React.Fragment key={index}>
                <span className="inline-block mr-8 text-right text-gray-500 select-none">{index + 1}</span>
                <span>{line}</span>
                {'\n'}
            </React.Fragment>
        ));
    };




    return (
        <div className={cn("rounded-lg border text-black", className)}>
            <div className="h-[50px] px-4 flex items-center justify-between text-sm font-mono bg-gray-100 rounded-t-md">
                {filename && <div>{filename}</div>}

                {copyable && (
                    <button
                        className="p-2 duration-300 hover:bg-gray-200 rounded-md"
                        onClick={() => {
                            navigator.clipboard.writeText(codeString);
                            toast.info('Copied to clipboard');
                        }}
                    >
                        <Copy size={14} />
                    </button>
                )}

                {switcher && (
                    <div className="px-4 py-2 text-sm font-mono text-right">
                        {switcher}
                    </div>
                )}
            </div>
            <pre className={`language-${language} p-4 overflow-x-auto`}>
                <code className="text-sm text-black font-mono">
                    {addLineNumbers(codeString)}
                </code>
            </pre>
        </div>
    );
}