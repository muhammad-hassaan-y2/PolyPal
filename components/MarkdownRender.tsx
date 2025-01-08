import React from 'react';
import {marked} from 'marked';

interface MarkdownRendererProps {
    markdownText: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownText }) => {
    const getMarkdownText = () => {
        const rawMarkup = marked(markdownText);
        return { __html: rawMarkup };
    };

    return <div dangerouslySetInnerHTML={getMarkdownText()} />;
};

export default MarkdownRenderer;