import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    landing: singleton({
      label: 'Landing',
      path: 'content/site/landing',
      format: { data: 'json' },
      schema: {
        hero: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow' }),
            title: fields.text({ label: 'Title' }),
            lede: fields.text({ label: 'Lede' }),
            ctaPrimary: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'Href' }),
              },
              { label: 'Primary CTA' }
            ),
            ctaSecondary: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'Href' }),
              },
              { label: 'Secondary CTA' }
            ),
            stats: fields.array(
              fields.object(
                {
                  label: fields.text({ label: 'Label' }),
                  value: fields.text({ label: 'Value' }),
                },
                { label: 'Stat', itemLabel: (item) => item?.label || 'Stat' }
              ),
              { label: 'Stats' }
            ),
            highlight: fields.object(
              {
                title: fields.text({ label: 'Title' }),
                body: fields.text({ label: 'Body' }),
                items: fields.array(fields.text({ label: 'Item' }), { label: 'Items' }),
                href: fields.text({ label: 'Href' }),
                linkLabel: fields.text({ label: 'Link Label' }),
              },
              { label: 'Highlight' }
            ),
          },
          { label: 'Hero' }
        ),
        why: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow' }),
            title: fields.text({ label: 'Title' }),
            lede: fields.text({ label: 'Lede' }),
            primary: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'Href' }),
              },
              { label: 'Primary CTA' }
            ),
            secondary: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'Href' }),
              },
              { label: 'Secondary CTA' }
            ),
          },
          { label: 'Why' }
        ),
        pillars: fields.array(
          fields.object(
            {
              title: fields.text({ label: 'Title' }),
              body: fields.text({ label: 'Body' }),
            },
            { label: 'Pillar', itemLabel: (item) => item?.title || 'Pillar' }
          ),
          { label: 'Pillars' }
        ),
        projects: fields.array(
          fields.object(
            {
              eyebrow: fields.text({ label: 'Eyebrow' }),
              title: fields.text({ label: 'Title' }),
              body: fields.text({ label: 'Body' }),
              href: fields.text({ label: 'Href' }),
              linkLabel: fields.text({ label: 'Link Label' }),
            },
            { label: 'Project', itemLabel: (item) => item?.title || 'Project' }
          ),
          { label: 'Projects' }
        ),
        team: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow' }),
            title: fields.text({ label: 'Title' }),
            lede: fields.text({ label: 'Lede' }),
            primary: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'Href' }),
              },
              { label: 'Primary CTA' }
            ),
            secondary: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'Href' }),
              },
              { label: 'Secondary CTA' }
            ),
            ctaTitle: fields.text({ label: 'CTA Title' }),
            ctaBody: fields.text({ label: 'CTA Body' }),
          },
          { label: 'Team' }
        ),
        news: fields.array(
          fields.object(
            {
              eyebrow: fields.text({ label: 'Eyebrow' }),
              title: fields.text({ label: 'Title' }),
              body: fields.text({ label: 'Body' }),
              href: fields.text({ label: 'Href' }),
              linkLabel: fields.text({ label: 'Link Label' }),
            },
            { label: 'News Item', itemLabel: (item) => item?.title || 'News Item' }
          ),
          { label: 'News' }
        ),
      },
    }),
  },
  collections: {
    people: collection({
      label: 'People',
      slugField: 'name',
      path: 'content/people/*',
      format: { contentField: 'bio' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        email: fields.text({ label: 'Email', validation: { isRequired: false } }),
        bio: fields.document({
          label: 'Biography',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/people',
            publicPath: '/images/people/',
          },
        }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/people',
          publicPath: '/images/people/',
        }),
      },
    }),
  },
});
