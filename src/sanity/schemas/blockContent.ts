import { defineType, defineArrayMember } from "sanity";

/** Rich text block type (PortableText). Used by post + service bodies. */
export default defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
        { title: "Pullout", value: "pullout" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    }),
    defineArrayMember({ type: "image", options: { hotspot: true }, fields: [
      { name: "alt", type: "string", title: "Alt text" },
      { name: "caption", type: "string", title: "Caption" },
    ]}),
    defineArrayMember({
      type: "object",
      name: "table",
      title: "Cost table",
      fields: [
        { name: "caption", type: "string", title: "Caption" },
        {
          name: "rows",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "item", type: "string", title: "Item" },
              { name: "low", type: "string", title: "Low" },
              { name: "high", type: "string", title: "High" },
              { name: "note", type: "string", title: "Note" },
            ],
          }],
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "pullout",
      title: "Pullout callout",
      fields: [{ name: "text", type: "text", title: "Text" }],
    }),
  ],
});
