"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Minus,
} from "lucide-react";
import { useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

type UploadResult = { info?: { secure_url?: string } };

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ HTMLAttributes: { class: "rounded-xl" } }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Youtube.configure({ controls: true, nocookie: true, width: 720, height: 405 }),
      CharacterCount,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-lg max-w-none min-h-[400px] p-6 focus:outline-none " +
          "prose-headings:text-white prose-p:text-slate-200 prose-a:text-[#ffa800] " +
          "prose-strong:text-white prose-code:text-[#ffb92e] " +
          "prose-blockquote:border-l-[#ffa800] prose-blockquote:text-slate-300",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="px-4 py-2 border-t border-white/5 text-xs text-slate-500 flex justify-between">
        <span>{editor.storage.characterCount.words()} mots</span>
        <span>{editor.storage.characterCount.characters()} caractères</span>
      </div>
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("URL du lien :", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("URL YouTube :");
    if (!url) return;
    editor.commands.setYoutubeVideo({ src: url });
  };

  const addImageByUrl = () => {
    const url = window.prompt("URL de l'image :");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const canUploadCloudinary = !!cloudName && !!uploadPreset;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-slate-950/50">
      <ToolbarButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="Gras"
      >
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="Italique"
      >
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        label="Souligné"
      >
        <UnderlineIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        label="Barré"
      >
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="Titre 2"
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        label="Titre 3"
      >
        <Heading3 className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label="Liste"
      >
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label="Liste numérotée"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        label="Citation"
      >
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        label="Bloc de code"
      >
        <Code className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        label="Séparateur"
      >
        <Minus className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        label="Gauche"
      >
        <AlignLeft className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        label="Centré"
      >
        <AlignCenter className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        label="Droite"
      >
        <AlignRight className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton active={editor.isActive("link")} onClick={setLink} label="Lien">
        <LinkIcon className="w-4 h-4" />
      </ToolbarButton>

      {canUploadCloudinary ? (
        <CldUploadWidget
          uploadPreset={uploadPreset!}
          options={{ maxFileSize: 5_000_000, resourceType: "image", sources: ["local", "url"] }}
          onSuccess={(result) => {
            const r = result as UploadResult;
            const url = r.info?.secure_url;
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          {({ open }) => (
            <ToolbarButton onClick={() => open()} label="Image (upload)">
              <ImageIcon className="w-4 h-4" />
            </ToolbarButton>
          )}
        </CldUploadWidget>
      ) : (
        <ToolbarButton onClick={addImageByUrl} label="Image par URL">
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
      )}

      <ToolbarButton onClick={addYoutube} label="YouTube">
        <YoutubeIcon className="w-4 h-4" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        label="Annuler"
      >
        <Undo2 className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        label="Rétablir"
      >
        <Redo2 className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`w-8 h-8 inline-flex items-center justify-center rounded-md transition-colors
        ${
          active
            ? "bg-[#ffa800] text-slate-950"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }
        disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-white/10 mx-1" aria-hidden />;
}
