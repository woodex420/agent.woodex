/**
 * Section: Marquee — animated client logos strip.
 */
import { defineField, defineType } from "sanity";

export default defineType({
  name: "section.marquee",
  title: "Client logo marquee",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kicker",
      type: "string",
      initialValue: "Trusted by 120+ clients across Pakistan",
    }),
    defineField({
      name: "logos",
      title: "Client names / logos",
      type: "array",
      validation: (r) => r.min(6),
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name", validation: (r) => r.required() },
            { name: "logo", type: "image", title: "Logo (optional; leave blank for text)", options: { hotspot: true } },
            { name: "href", type: "string", title: "Link (optional)" },
          ],
          preview: { select: { title: "name" } },
        },
      ],
      initialValue: [
        { name: "Nishat Hospitality" },
        { name: "Packages Mall" },
        { name: "Gulberg Galleria" },
        { name: "LUMS" },
        { name: "HBL" },
        { name: "KFC Pakistan" },
        { name: "Systems Ltd" },
        { name: "IT Heights" },
        { name: "Packages Ltd" },
        { name: "Fauji Foundation" },
        { name: "Defence Raya" },
        { name: "Movenpick" },
        { name: "Arif Habib Group" },
        { name: "Service Industries" },
      ],
    }),
    defineField({
      name: "speed",
      title: "Speed (seconds per loop)",
      type: "number",
      initialValue: 50,
    }),
  ],
  preview: {
    select: { logos: "logos" },
    prepare({ logos }: any) {
      return { title: "Marquee", subtitle: `${logos?.length ?? 0} clients` };
    },
  },
});
