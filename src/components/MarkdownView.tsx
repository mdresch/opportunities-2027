import React, { useMemo } from 'react';
import { marked, type Token, type Tokens } from 'marked';

interface MarkdownViewProps {
  content: string;
  currentPath?: string;
  onNavigateMarkdown?: (resolvedPath: string) => void;
}

function stripFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: {}, body: raw };

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (kv) {
      frontmatter[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return { frontmatter, body: raw.slice(match[0].length) };
}

function resolveRelativePath(currentPath: string | undefined, href: string): string | null {
  const cleanHref = href.split('#')[0];
  if (!cleanHref || /^https?:\/\//i.test(cleanHref) || cleanHref.startsWith('mailto:')) {
    return null;
  }
  if (!cleanHref.toLowerCase().endsWith('.md')) return null;

  const baseDir = currentPath && currentPath.includes('/')
    ? currentPath.slice(0, currentPath.lastIndexOf('/'))
    : '';
  const parts = [...(baseDir ? baseDir.split('/') : []), ...cleanHref.split('/')];
  const stack: string[] = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  return stack.join('/');
}

function renderInlineTokens(
  tokens: Token[] | undefined,
  currentPath: string | undefined,
  onNavigateMarkdown: ((path: string) => void) | undefined,
  keyPrefix: string
): React.ReactNode {
  if (!tokens || tokens.length === 0) return null;

  return tokens.map((token, idx) => {
    const key = `${keyPrefix}-${idx}`;
    switch (token.type) {
      case 'text': {
        const t = token as Tokens.Text;
        if (t.tokens && t.tokens.length > 0) {
          return (
            <React.Fragment key={key}>
              {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
            </React.Fragment>
          );
        }
        return <React.Fragment key={key}>{t.text}</React.Fragment>;
      }
      case 'strong': {
        const t = token as Tokens.Strong;
        return (
          <strong key={key} className="font-semibold text-[#10253f]">
            {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
          </strong>
        );
      }
      case 'em': {
        const t = token as Tokens.Em;
        return (
          <em key={key} className="italic text-[#40536b]">
            {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
          </em>
        );
      }
      case 'codespan': {
        const t = token as Tokens.Codespan;
        return (
          <code
            key={key}
            className="font-mono text-[12.5px] bg-[#eef5f7] text-[#10253f] px-1.5 py-0.5 rounded"
          >
            {t.text}
          </code>
        );
      }
      case 'del': {
        const t = token as Tokens.Del;
        return (
          <del key={key} className="line-through text-[#52647a]">
            {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
          </del>
        );
      }
      case 'br':
        return <br key={key} />;
      case 'link': {
        const t = token as Tokens.Link;
        const resolved = resolveRelativePath(currentPath, t.href);
        if (resolved && onNavigateMarkdown) {
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigateMarkdown(resolved)}
              className="text-[#0c8b82] hover:text-[#075d68] underline underline-offset-2 font-medium text-left cursor-pointer"
            >
              {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
            </button>
          );
        }
        if (/^https?:\/\//i.test(t.href)) {
          return (
            <a
              key={key}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0c8b82] hover:text-[#075d68] underline underline-offset-2 font-medium"
            >
              {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
            </a>
          );
        }
        return (
          <span key={key} className="text-[#40536b] font-medium">
            {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
          </span>
        );
      }
      case 'escape': {
        const t = token as Tokens.Escape;
        return <React.Fragment key={key}>{t.text}</React.Fragment>;
      }
      default:
        return <React.Fragment key={key}>{'raw' in token ? token.raw : ''}</React.Fragment>;
    }
  });
}

function renderBlockTokens(
  tokens: Token[],
  currentPath: string | undefined,
  onNavigateMarkdown: ((path: string) => void) | undefined,
  keyPrefix: string
): React.ReactNode {
  return tokens.map((token, idx) => {
    const key = `${keyPrefix}-${idx}`;
    switch (token.type) {
      case 'space':
        return null;
      case 'heading': {
        const t = token as Tokens.Heading;
        const inner = renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key);
        if (t.depth === 1) {
          return (
            <h1
              key={key}
              className="text-2xl font-bold text-[#10253f] tracking-tight mt-2 mb-4 pb-3 border-b border-[#dae3e9]"
            >
              {inner}
            </h1>
          );
        }
        if (t.depth === 2) {
          return (
            <h2
              key={key}
              className="text-lg font-semibold text-[#142a48] tracking-tight mt-7 mb-3"
            >
              {inner}
            </h2>
          );
        }
        if (t.depth === 3) {
          return (
            <h3 key={key} className="text-[15px] font-semibold text-[#075d68] mt-5 mb-2">
              {inner}
            </h3>
          );
        }
        return (
          <h4 key={key} className="text-sm font-semibold text-[#142a48] mt-4 mb-1.5">
            {inner}
          </h4>
        );
      }
      case 'paragraph': {
        const t = token as Tokens.Paragraph;
        return (
          <p key={key} className="text-[14.5px] leading-[1.65] text-[#17243a] mb-3.5 max-w-[74ch]">
            {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
          </p>
        );
      }
      case 'blockquote': {
        const t = token as Tokens.Blockquote;
        return (
          <blockquote
            key={key}
            className="my-4 px-4 py-3 bg-[#eef5f7] border border-[#dae3e9] rounded-md text-[13.5px] text-[#40536b]"
          >
            {renderBlockTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
          </blockquote>
        );
      }
      case 'list': {
        const t = token as Tokens.List;
        const ListTag = t.ordered ? 'ol' : 'ul';
        return (
          <ListTag
            key={key}
            className={`my-3 pl-5 space-y-1.5 text-[14.5px] leading-[1.6] text-[#17243a] max-w-[74ch] ${
              t.ordered ? 'list-decimal' : 'list-disc'
            }`}
          >
            {t.items.map((item, itemIdx) => (
              <li key={`${key}-li-${itemIdx}`} className="pl-1">
                {renderBlockTokens(item.tokens, currentPath, onNavigateMarkdown, `${key}-li-${itemIdx}`)}
              </li>
            ))}
          </ListTag>
        );
      }
      case 'text': {
        const t = token as Tokens.Text;
        if (t.tokens && t.tokens.length > 0) {
          return (
            <span key={key}>
              {renderInlineTokens(t.tokens, currentPath, onNavigateMarkdown, key)}
            </span>
          );
        }
        return <span key={key}>{t.text}</span>;
      }
      case 'table': {
        const t = token as Tokens.Table;
        return (
          <div key={key} className="my-5 overflow-x-auto border border-[#dae3e9] rounded-md bg-white">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="bg-[#10253f] text-white">
                  {t.header.map((cell, cIdx) => (
                    <th
                      key={`${key}-th-${cIdx}`}
                      className="px-3 py-2.5 font-semibold text-xs tracking-wide whitespace-nowrap"
                    >
                      {renderInlineTokens(cell.tokens, currentPath, onNavigateMarkdown, `${key}-th-${cIdx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dae3e9]">
                {t.rows.map((row, rIdx) => (
                  <tr
                    key={`${key}-tr-${rIdx}`}
                    className={rIdx % 2 === 1 ? 'bg-[#f8fbfc]' : 'bg-white'}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={`${key}-td-${rIdx}-${cIdx}`}
                        className="px-3 py-2.5 align-top text-[#17243a] leading-relaxed"
                      >
                        {renderInlineTokens(
                          cell.tokens,
                          currentPath,
                          onNavigateMarkdown,
                          `${key}-td-${rIdx}-${cIdx}`
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      case 'code': {
        const t = token as Tokens.Code;
        return (
          <pre
            key={key}
            className="my-4 p-4 bg-[#10253f] text-[#e5edf5] rounded-md overflow-x-auto text-[12.5px] font-mono leading-relaxed"
          >
            <code>{t.text}</code>
          </pre>
        );
      }
      case 'hr':
        return <hr key={key} className="my-6 border-0 border-t border-[#dae3e9]" />;
      default:
        return null;
    }
  });
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  content,
  currentPath,
  onNavigateMarkdown,
}) => {
  const { frontmatter, tokens } = useMemo(() => {
    const parsed = stripFrontmatter(content);
    const lexed = marked.lexer(parsed.body, { gfm: true, breaks: false });
    return { frontmatter: parsed.frontmatter, tokens: lexed };
  }, [content]);

  const metaEntries = Object.entries(frontmatter).slice(0, 6);

  return (
    <div className="w-full">
      {metaEntries.length > 0 && (
        <div className="mb-5 pb-3 border-b border-[#dae3e9] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#52647a]">
          {metaEntries.map(([k, v], idx) => (
            <React.Fragment key={k}>
              {idx > 0 && <span aria-hidden="true">·</span>}
              <span>
                <span className="font-medium text-[#40536b]">{k.replace(/_/g, ' ')}:</span>{' '}
                <span className="font-mono text-[#17243a]">{v}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
      <div>{renderBlockTokens(tokens, currentPath, onNavigateMarkdown, 'md')}</div>
    </div>
  );
};
